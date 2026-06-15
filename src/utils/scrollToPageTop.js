/** Force window to the very top — no restored scroll position. */
export function scrollToPageTop() {
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
