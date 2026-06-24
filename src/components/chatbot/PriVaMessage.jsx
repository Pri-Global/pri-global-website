import { Link } from "react-router-dom";

// Lightweight, dependency-free markdown renderer for PriVa replies.
// Handles the small subset the model actually produces: **bold**, bullet and
// numbered lists, paragraphs, and links (internal /paths, http(s) URLs, emails).

// URL must be tested before /path so a path inside a URL isn't matched alone.
const LINK_RE =
  /(https?:\/\/[^\s)]+)|([\w.+-]+@[\w-]+\.[\w.-]+)|(\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*)/gi;

const linkClass = "text-royal underline underline-offset-2 hover:opacity-80";

function renderLinks(text, keyPrefix) {
  const nodes = [];
  const re = new RegExp(LINK_RE); // fresh instance: avoid shared lastIndex
  let last = 0;
  let match;
  let n = 0;
  while ((match = re.exec(text)) !== null) {
    const [full, url, email, path] = match;
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-lnk${n++}`;
    if (url) {
      const clean = url.replace(/[.,;:]+$/, ""); // drop trailing punctuation
      nodes.push(
        <a key={key} href={clean} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {clean}
        </a>
      );
      last = match.index + clean.length;
      re.lastIndex = last;
    } else if (email) {
      nodes.push(
        <Link key={key} to="/about#contact" className={linkClass}>
          contact form
        </Link>
      );
      last = match.index + full.length;
    } else {
      nodes.push(
        <Link key={key} to={path} className={linkClass}>
          {path}
        </Link>
      );
      last = match.index + full.length;
    }
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderInline(text, keyPrefix) {
  // Split on **bold** while keeping the delimiters' content.
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={`${keyPrefix}-b${idx}`} className="font-semibold">
          {renderLinks(part.slice(2, -2), `${keyPrefix}-b${idx}`)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-s${idx}`}>{renderLinks(part, `${keyPrefix}-s${idx}`)}</span>;
  });
}

function parseBlocks(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const ol = line.match(/^(\d+)[.)]\s+(.*)$/);
    const ul = line.match(/^[-*•]\s+(.*)$/);
    if (ol) {
      if (!list || !list.ordered) {
        flush();
        list = { type: "list", ordered: true, items: [] };
      }
      list.items.push(ol[2]);
    } else if (ul) {
      if (!list || list.ordered) {
        flush();
        list = { type: "list", ordered: false, items: [] };
      }
      list.items.push(ul[1]);
    } else {
      flush();
      blocks.push({ type: "para", text: line });
    }
  }
  flush();
  return blocks;
}

export default function PriVaMessage({ content }) {
  const blocks = parseBlocks(content ?? "");
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (block.type === "para") {
          return <p key={`p${i}`}>{renderInline(block.text, `p${i}`)}</p>;
        }
        const items = block.items.map((it, j) => (
          <li key={`li${i}-${j}`}>{renderInline(it, `li${i}-${j}`)}</li>
        ));
        return block.ordered ? (
          <ol key={`ol${i}`} className="list-decimal pl-5 space-y-1">
            {items}
          </ol>
        ) : (
          <ul key={`ul${i}`} className="list-disc pl-5 space-y-1">
            {items}
          </ul>
        );
      })}
    </div>
  );
}
