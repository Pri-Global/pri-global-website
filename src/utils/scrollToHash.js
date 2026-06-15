/** Scroll to an in-page anchor, with retries for async-rendered sections. */
export function scrollToHash(hash, { behavior = "smooth" } = {}) {
  const id = (hash || "").replace(/^#/, "");
  if (!id) return false;

  const scroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
      return true;
    }
    return false;
  };

  if (scroll()) return true;

  requestAnimationFrame(() => {
    if (!scroll()) {
      [50, 150, 350].forEach((ms) => setTimeout(scroll, ms));
    }
  });

  return false;
}
