/* 
    Author: Natalie Arai 
    CS20 Midterm Project: l'elephante bakery
    menu.js - reads the menu from data/menu.json and turns each entry into a MenuItem object
*/

// MenuItem: an object for one thing we sell
function MenuItem(name, price, description, image, category, seasonal) {
    this.name = name;
    this.price = price; // stored as text so we can use decimals
    this.description = description;
    this.image = image;
    this.category = category;
    this.seasonal = seasonal;
    this.getPrice = getPrice;
}

// getPrice: returns the price ready to display 
function getPrice() {
    return "$" + this.price;
}

// loadMenu: reads the external JSON and call buildMenu with the items
function loadMenuItems(callback, boxId) {
    fetch("data/menu.json")
        .then(res => res.text())
        .then(data => {
            var entries = JSON.parse(data);
            var menuItems = [];
            // turn each plain JSON entry into a Menu object
            entries.forEach((entry) => {
                menuItems.push(new MenuItem(entry.name, entry.price, entry.description, entry.image, entry.category, entry.seasonal));
            });
            callback(menuItems);
        })
        // in case there is an error with building the menu
        .catch(error => {
            console.log(error);
            document.getElementById(boxId).innerHTML = "<p class='center'>The menu didn't load. Referesh the page, or call us at (123) 456-7890 for today's menu.</p>";
        });
}

// buildMenu: writes one section per category
function buildMenu(menuItems) {
    var categories = [];
    var html = "";
    // find all the unique categories
    menuItems.forEach((item) => {
        if (categories.indexOf(item.category) == -1)
            categories.push(item.category);
    });
    // create an html section for each category
    categories.forEach((category) => {
        var itemsInCategory = menuItems.filter(item => item.category == category);
        // start building the html for the given category
        html += "<section class='menu-section'>";
        html += "<h2>" + category + "</h2>";
        html += "<div class='card-grid'>";
        // create a card for every menu item in the category
        itemsInCategory.forEach((item) => {
            html += createCard(item);
        });
        html += "</div></section>";
    });
    // display the html on the webpage
    document.getElementById("menu-list").innerHTML = html;
}

// buildSeasonal: homepage needs to show the first 3 seasonal items as cards
function buildSeasonal(menuItems) {
    var seasonalItems = menuItems.filter(item => item.seasonal == true);
    var html = "";
    for (var i = 0; i < seasonalItems.length && i < 3; i ++)
        html += createCard(seasonalItems[i]);
    document.getElementById("seasonal-list").innerHTML = html;
}

// startMenu: runs the right builder depending on which box is on the current page
function startMenu() {
    if (document.getElementById("menu-list"))
        loadMenuItems(buildMenu, "menu-list");
    if (document.getElementById("seasonal-list"))
        loadMenuItems(buildSeasonal, "seasonal-list");
}

// run loadMenu whenever the webpage loads
window.addEventListener("load", startMenu);