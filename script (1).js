document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Smooth scroll for in-page links (nav and header buttons)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  // Highlight the nav link for the section currently in view
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const marker = window.scrollY + window.innerHeight * 0.3;
    let current = null;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });
    navLinks.forEach((link) => {
      const isActive = current && link.getAttribute("href") === `#${current.id}`;
      link.classList.toggle("active", Boolean(isActive));
      if (isActive) {
        link.setAttribute("aria-current", "true");
        link.scrollIntoView({ block: "nearest", inline: "nearest" });
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
});
