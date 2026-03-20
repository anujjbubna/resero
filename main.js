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
