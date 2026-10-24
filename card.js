/* 
    Author:  
    CS20 Midterm Project: l'elephante bakery
    card.js - builds the card for one menu item
*/

// TODO: build cards
/* natalie's contract menu.js uses:
    createCard(item)
        item is a MenuItem object (see menu.js) with
            item.name, item.description, item.image, item.category, item.seasonal (true/false), and the item.getPrice() (a method)
        must return one card as a string of html
*/

// createCard: returns the HTML for a simple card (temporary version) 
function createCard(item) {
    var card = "<article class='menu-card'>";
    card += "<img src='" + item.image + "' alt='" + item.name + "'>";
    card += "<h3>" + item.name + "</h3>";
    card += "<p class='price'>" + item.getPrice() + "</p>";
    card += "<p>" + item.description + "</p>";
    return card;
}