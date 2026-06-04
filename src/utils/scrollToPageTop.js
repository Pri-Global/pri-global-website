/** Force window to the very top — no hash anchors, no restored scroll position. */
export function scrollToPageTop() {
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  const run = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  run();
  requestAnimationFrame(run);
  requestAnimationFrame(() => requestAnimationFrame(run));
  [0, 50, 150, 350].forEach((ms) => setTimeout(run, ms));
}
