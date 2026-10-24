// hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu-toggle");
  const closeButton = document.querySelector(".menu-close");
  const panel = document.querySelector(".menu-panel");
  const overlay = document.querySelector(".menu-overlay");

  if (!toggleButton || !panel || !overlay) return;

  function openMenu() {
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  toggleButton.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);
  if (closeButton) closeButton.addEventListener("click", closeMenu);

  // closes menu when a tab on the menu is clicked
  panel.querySelectorAll(".menu-list a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});