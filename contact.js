/* 
    Author: Natalie Arai
    CS20 Midterm Project: l'elephante bakery
    contact.js - uses an associative array to build a table showing available hours, highlights the current day,
                 and states whether the shop is currently open right now.
*/

// associative array where day name -> [opening hour, closing hour] on a 24-hour clock
var hours = {
    Monday: null,
    Tuesday: [7, 14],
    Wednesday: [7, 14],
    Thursday: [7, 14],
    Friday: [7, 14],
    Saturday: [8, 15],
    Sunday: [8, 15],
};

// getDay function returns 0-6 starting with sundat, so this array turns it into a name
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// formatHour: turns a 24 hour number into the hour with am or pm
function formatHour(h) {
    if (h == 12) 
        return "12 pm";
    return h < 12 ? h + " am" : (h - 12) + " pm";
}

// showHours: writes the hours table with open or closed messages
function showHours() {
    var now = new Date();
    var today = dayNames[now.getDay()];
    var hourNow = now.getHours();
    var html = "<table class='hours'>";
    // one row per day in the order of the associative array
    for (var day in hours) {
        var rowClass = (day == today) ? " class='today'" : "";
        var time = (hours[day] == null) ? "Closed" : formatHour(hours[day][0]) + " - " + formatHour(hours[day][1]);
        html += "<tr" + rowClass + "><td" + day + "</td><td>" + time + "</td></tr>";
    }
    html += "</table>";
    document.getElementById("hours-table").innerHTML = html;
    // show open/closed messages and display available day/hours if necessary
    var status = document.getElementById("open-status");
    var todayHours = hours[today];
    if (todayhours == null)
        status.innerText = "Sorry, we're closed today (" + today + "). See you tomorrow!";
    else if (hoursNow >= todayHours[0] && hourNow < todayHours[1])
        status.innerText = "We're open now until " + formatHour(todayHours[1] + ".");
    else 
        status.innerText = "Sorry, we're closed righ now. Today's hours: " + formatHour(todayHours[0]) + " - " + formatHours(todayHours[1]) + ".";
}

// run this whenever the page loads
window.addEventListener("load", showHours);