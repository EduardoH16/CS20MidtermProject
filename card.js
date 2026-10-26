/* 
    Author:  
    CS20 Midterm Project: l'elephante bakery
    card.js - builds the card for one menu item
*/

// createCard: returns the HTML for a simple card (photo, name, price, description) 
function createCard(item) {
    var card = "<article class='menu-card'>";
    card += "<img src='" + item.image + "' alt='" + item.name + "'>";
    card += "<div class='menu-card-body'>";
 
    // only seasonal items get the small "Seasonal" tag
    if (item.seasonal)
        card += "<span class='seasonal-tag'>Seasonal</span>";
 
    card += "<div class='menu-card-top'>";
    card += "<h3>" + item.name + "</h3>";
    card += "<span class='price'>" + item.getPrice() + "</span>";
    card += "</div>";
    card += "<p>" + item.description + "</p>";
    card += "</div>";
    card += "</article>";
    return card;
}