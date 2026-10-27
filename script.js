/* 
    Author: Natalie Arai
    CS20 Midterm Project: l'elephante bakery
    script.js - a shared javascript file that is linked on every page as a fixed page element;
                runs the hamburger menu andn puts the current year in the footer
*/

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

  // the file name of the page that's open (the site's main address counts as index.html)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  panel.querySelectorAll(".menu-list a").forEach((link) => {
    // closes menu when a tab on the menu is clicked
    link.addEventListener("click", closeMenu);

    // highlights the link for the page you're on
    if (link.getAttribute("href") === currentPage)
      link.classList.add("is-current");
  });
});

// setUpPage: runs once the page has loaded to the header/footer elements exist
function setUpPage() {
    // keep the copyright year current using the Date object
    var year = document.getElementById("year");
    if (year) {
        var today = new Date();
        year.innerText = today.getFullYear();
    }
}

// use an event listener so other pages can add their own load handles without overwriting the footer
window.addEventListener("load", setUpPage);