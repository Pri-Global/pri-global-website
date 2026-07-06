/**
 * CI / maintenance: fail if JSX files use React hooks without importing them.
 * Run: node scripts/check-react-hooks.mjs
 */
import fs from "fs";
import path from "path";

const HOOKS = [
  "useState",
  "useEffect",
  "useRef",
  "useMemo",
  "useCallback",
  "useContext",
  "useReducer",
  "useLayoutEffect",
  "useId",
  "useSyncExternalStore",
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (/\.(jsx|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

const issues = [];

for (const file of walk("src")) {
  const src = fs.readFileSync(file, "utf8");
  const importMatch = src.match(/import\s*\{([^}]+)\}\s*from\s*["']react["']/);
  const imported = importMatch
    ? importMatch[1].split(",").map((part) => part.trim().split(/\s+as\s+/)[0].trim())
    : [];
  const hasDefaultReact = /(^|\n)import\s+React\b/.test(src);

  for (const hook of HOOKS) {
    const used = new RegExp(`\\b${hook}\\s*\\(`).test(src);
    if (used && !imported.includes(hook) && !hasDefaultReact) {
      issues.push(`${file}: uses ${hook} but does not import it`);
    }
  }
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`OK — checked ${walk("src").length} components for hook imports.`);
