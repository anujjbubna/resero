const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-toggle-label");
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
};

applyTheme(document.documentElement.dataset.theme || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("resero-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

darkModeMediaQuery.addEventListener("change", (event) => {
  if (localStorage.getItem("resero-theme")) {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
});

const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-panel, .info-card, .step-card, .resource-item, .cta-section"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
}
