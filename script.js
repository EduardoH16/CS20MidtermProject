/* 
    Author: Natalie Arai
    CS20 Midterm Project: l'elephante bakery
    script.js - a shared javascript file that is linked on every page as a fixed page element;
                runs the hamburger menu andn puts the current year in the footer
*/

// setUpPage: runs once the page has loaded to the header/footer elements exist
function setUpPage() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    // humburger is like a button that opens/closes the nav list on small screens when clicked
    // TODO: currently is skipped if the page has no header yet, but can be updated after I get header from eddy
    if (toggle && nav) {
        toggle.onclick = function() {
            if (nav.className == "main-nav open") {
                nav.className = "main-nav";
                toggle.setAttribute("aria-expanded", false);
            }
            else {
                nav.className = "main-nav open";
                toggle.setAttribute("aria-expanded", true);
            }
        };
    }
    // keep the copyright year current using the Date object
    var today = new Date();
    document.getElementById("year").innerText = today.getFullYear();
}

// use an event listener so other pages can add their own load handles without overwriting the footer
window.addEventListener("load", setUpPage);