(() => {
  "use strict";

  const ready = (fn) => document.readyState !== "loading"
    ? fn()
    : document.addEventListener("DOMContentLoaded", fn, { once: true });

  ready(() => {
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const faqButtons = Array.from(document.querySelectorAll("#faq button, #faq .softlite-dynamic-card-box-button"));
    faqButtons.forEach((button, index) => {
      const panel = button.nextElementSibling;
      if (!panel) return;
      const panelId = `faq-panel-${index + 1}`;
      button.setAttribute("type", "button");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", panelId);
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.style.maxHeight = "0px";
      panel.style.overflow = "hidden";
      panel.style.transition = "max-height .35s cubic-bezier(.2,.7,.2,1)";

      button.addEventListener("click", (event) => {
        event.preventDefault();
        const opening = button.getAttribute("aria-expanded") !== "true";
        faqButtons.forEach((other) => {
          const otherPanel = other.nextElementSibling;
          other.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.style.maxHeight = "0px";
        });
        if (opening) {
          button.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    });

    const mobileCta = document.querySelector(".elementor-element-436b774c");
    const hero = document.querySelector("#o-que-e");
    const updateMobileCta = () => {
      if (!mobileCta) return;
      const visible = !hero || hero.getBoundingClientRect().bottom < 80;
      mobileCta.classList.toggle("is-visible", visible);
    };
    updateMobileCta();
    addEventListener("scroll", updateMobileCta, { passive: true });
    addEventListener("resize", updateMobileCta);
  });
})();
