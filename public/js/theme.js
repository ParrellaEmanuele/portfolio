/*
 * Applies a theme saved with the toggle. Loaded async and kept to a few lines, so it runs
 * before the first paint in practice without ever blocking rendering. The toggle itself
 * lives in site.js (deferred). Without a saved choice, the system setting applies (CSS).
 */
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
  } catch {
    /* storage unavailable: follow the system setting */
  }
})();
