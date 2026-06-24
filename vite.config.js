import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { generateReply } from './api/_priva-core.js'
import { createRealtimeSession } from './api/_realtime-core.js'
import { fetchLiveJobs } from './api/_jobdiva-core.js'

// Local dev-only middleware that mirrors the Vercel function at /api/priva.
// The OpenAI key is read server-side here and never exposed to the browser
// bundle (it is NOT prefixed with VITE_).
function privaApiPlugin(env) {
  return {
    name: 'priva-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/priva', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')

          const reply = await generateReply(body.messages, {
            apiKey: env.OPENAI_API_KEY,
            model: env.OPENAI_MODEL,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ reply }))
        } catch (err) {
          const code = err?.code
          if (code === 'EMPTY_INPUT') {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'No message provided.' }))
            return
          }
          if (code === 'NO_API_KEY') {
            console.error('PriVa: OPENAI_API_KEY is not set in .env')
            res.statusCode = 503
            res.end(JSON.stringify({ error: 'Assistant is not configured.' }))
            return
          }
          console.error('PriVa dev error:', code || err?.message, err?.detail || '')
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Assistant is temporarily unavailable.' }))
        }
      })

      server.middlewares.use('/api/jobs', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Allow', 'GET')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        try {
          const url = new URL(req.url, 'http://localhost')
          const keyword = url.searchParams.get('keyword') || ''
          const count = Math.min(Number(url.searchParams.get('count')) || 100, 200)
          const result = await fetchLiveJobs({ keyword, count })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
          res.end(JSON.stringify(result))
        } catch (err) {
          console.error('Jobs API dev error:', err?.message)
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Unable to load job listings.' }))
        }
      })

      // Voice: mint an ephemeral Realtime client secret (same as the Vercel fn).
      server.middlewares.use('/api/priva-realtime', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        try {
          const session = await createRealtimeSession({
            apiKey: env.OPENAI_API_KEY,
            model: env.OPENAI_REALTIME_MODEL,
            voice: env.OPENAI_REALTIME_VOICE,
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(session))
        } catch (err) {
          if (err?.code === 'NO_API_KEY') {
            console.error('PriVa voice: OPENAI_API_KEY is not set in .env')
            res.statusCode = 503
            res.end(JSON.stringify({ error: 'Voice is not configured.' }))
            return
          }
          console.error('PriVa voice dev error:', err?.code || err?.message, err?.detail || '')
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Voice is temporarily unavailable.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads ALL .env vars (incl. non-VITE OPENAI_API_KEY) into this
  // Node config context only — they are not injected into client code.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), privaApiPlugin(env)],
    server: {
      port: 3333,
    },
  }
})
