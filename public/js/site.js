/*
 * The site's only script: small progressive enhancements. The page works fully without it.
 * Loaded from this origin (CSP: script-src 'self'), no inline code, no third parties,
 * nothing sent anywhere. Stores one value in localStorage: the chosen theme.
 *
 *   1. Theme toggle: light/dark, remembered; otherwise the system setting applies.
 *   2. "Copy address" button next to the email.
 *   3. The header menu highlights the section on screen.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  var THEME_KEY = "theme";

  function readTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  }

  // Runs in <head>, before the page is painted, so a saved theme never flashes.
  var saved = readTheme();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setupThemeToggle() {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    function sync() {
      var dark = currentTheme() === "dark";
      buttons.forEach(function (b) {
        b.setAttribute("aria-label", dark ? b.getAttribute("data-to-light") : b.getAttribute("data-to-dark"));
        b.setAttribute("aria-pressed", dark ? "true" : "false");
      });
    }
    buttons.forEach(function (b) {
      b.hidden = false;
      b.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* private mode: the choice lasts for this page only */
        }
        sync();
      });
    });
    sync();
  }

  function setupCopyButtons() {
    if (!navigator.clipboard) return;
    document.querySelectorAll("[data-copy]").forEach(function (b) {
      var label = b.querySelector("[data-label]");
      var status = document.getElementById(b.getAttribute("aria-describedby") || "");
      var original = label ? label.textContent : "";
      var timer;
      b.hidden = false;
      b.addEventListener("click", function () {
        navigator.clipboard.writeText(b.getAttribute("data-copy")).then(function () {
          if (label) label.textContent = b.getAttribute("data-done");
          if (status) status.textContent = b.getAttribute("data-done");
          b.setAttribute("data-copied", "");
          clearTimeout(timer);
          timer = setTimeout(function () {
            if (label) label.textContent = original;
            if (status) status.textContent = "";
            b.removeAttribute("data-copied");
          }, 2000);
        });
      });
    });
  }

  function setupScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('header nav a[href^="#"]'));
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.removeAttribute("aria-current");
          });
          var link = byId[entry.target.id];
          if (link) link.setAttribute("aria-current", "location");
        });
      },
      // A section counts as "on screen" when it crosses the upper-middle band of the viewport.
      { rootMargin: "-35% 0px -60% 0px" }
    );
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggle();
    setupCopyButtons();
    setupScrollSpy();
  });
})();
