import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { generateReply } from './api/_priva-core.js'
import { createRealtimeSession } from './api/_realtime-core.js'
import { fetchLiveJobs, isJobdivaConfigured } from './api/_jobdiva-v2.js'
import candidateRegister from './api/candidate/register.js'
import candidateLogin from './api/candidate/login.js'
import candidateProfile from './api/candidate/profile.js'
import candidateApplications from './api/candidate/applications.js'
import candidateApply from './api/candidate/apply.js'
import candidateDashboard from './api/candidate/dashboard.js'
import employeeMicrosoftCallback from './api/employee/auth/microsoft/callback.js'
import employeeMicrosoftAuth from './api/employee/auth/microsoft.js'
import employeeRipplingAuth from './api/employee/auth/rippling.js'
import employeeRipplingConnect from './api/employee/rippling/connect.js'
import employeeRipplingCallback from './api/employee/rippling/callback.js'
import employeeAuthStatus from './api/employee/auth/status.js'
import employeeMe from './api/employee/me.js'
import employeeTeams from './api/employee/teams.js'
import { setServerEnv } from './api/_runtime-env.js'

function mountApiRoute(basePath, handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (err) {
      console.error(`${basePath} dev error:`, err?.message)
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Request failed.' }))
    }
  }
}

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
          if (!isJobdivaConfigured()) {
            res.statusCode = 503
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Job listings are not configured.' }))
            return
          }
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

      server.middlewares.use('/api/candidate/register', mountApiRoute('/register', candidateRegister))
      server.middlewares.use('/api/candidate/login', mountApiRoute('/login', candidateLogin))
      server.middlewares.use('/api/candidate/profile', mountApiRoute('/profile', candidateProfile))
      server.middlewares.use('/api/candidate/applications', mountApiRoute('/applications', candidateApplications))
      server.middlewares.use('/api/candidate/apply', mountApiRoute('/apply', candidateApply))
      server.middlewares.use('/api/candidate/dashboard', mountApiRoute('/dashboard', candidateDashboard))

      server.middlewares.use('/api/employee/auth/microsoft/callback', mountApiRoute('/employee/auth/microsoft/callback', employeeMicrosoftCallback))
      server.middlewares.use('/api/employee/auth/microsoft', mountApiRoute('/employee/auth/microsoft', employeeMicrosoftAuth))
      server.middlewares.use('/api/employee/rippling/callback', mountApiRoute('/employee/rippling/callback', employeeRipplingCallback))
      server.middlewares.use('/api/employee/rippling/connect', mountApiRoute('/employee/rippling/connect', employeeRipplingConnect))
      server.middlewares.use('/api/employee/auth/rippling', mountApiRoute('/employee/auth/rippling', employeeRipplingAuth))
      server.middlewares.use('/api/employee/auth/status', mountApiRoute('/employee/auth/status', employeeAuthStatus))
      server.middlewares.use('/api/employee/me', mountApiRoute('/employee/me', employeeMe))
      server.middlewares.use('/api/employee/teams', mountApiRoute('/employee/teams', employeeTeams))

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
  setServerEnv(env)
  return {
    plugins: [react(), privaApiPlugin(env)],
    server: {
      port: 3333,
    },
  }
})
