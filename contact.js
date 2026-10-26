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
        html += "<tr" + rowClass + "><td>" + day + "</td><td>" + time + "</td></tr>";
    }
    html += "</table>";
    document.getElementById("hours-table").innerHTML = html;
    // show open/closed messages and display available day/hours if necessary
    var status = document.getElementById("open-status");
    var todayHours = hours[today];
    if (todayHours == null)
        status.innerText = "Sorry, we're closed today (" + today + "). See you tomorrow!";
    else if (hourNow >= todayHours[0] && hourNow < todayHours[1])
        status.innerText = "We're open now until " + formatHour(todayHours[1]) + ".";
    else 
        status.innerText = "Sorry, we're closed righ now. Today's hours: " + formatHour(todayHours[0]) + " - " + formatHour(todayHours[1]) + ".";
}

// isBlank: true when a value is empty or only spaces
function isBlank(value) {
    return /^\s*$/.test(value);
}

// showError: writes a message under a field and marks the field
function showError(field, message) {
    document.getElementById(field.id + "-error").innerText = message;
    field.className = (message == "") ? "" : "has-error";
}

//validateContact: checks every field and shows appropriate error
function validateContact() {
    var name = document.getElementById("contact-name");
    var email = document.getElementById("contact-email");
    var phone = document.getElementById("contact-phone");
    var topic = document.getElementById("contact-topic");
    var message = document.getElementById("contact-message");
 
    var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    var phonePattern = /^\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
    var firstProblem = null;
 
    // clear errors from the last attempt
    showError(name, "");
    showError(email, "");
    showError(phone, "");
    showError(topic, "");
    showError(message, "");
 
    if (isBlank(name.value)) {
        showError(name, "Enter your name.");
        if (!firstProblem) firstProblem = name;
    }
 
    if (isBlank(email.value)) {
        showError(email, "Enter your email so we can reply.");
        if (!firstProblem) firstProblem = email;
    }
    else if (!emailPattern.test(email.value)) {
        showError(email, "Enter an email like name@example.com.");
        if (!firstProblem) firstProblem = email;
    }
 
    // phone is optional, but if it is filled in it must look like a phone number
    if (!isBlank(phone.value) && !phonePattern.test(phone.value)) {
        showError(phone, "Enter a 10-digit phone number, like (617) 555-0142, or leave it blank.");
        if (!firstProblem) firstProblem = phone;
    }
 
    if (topic.selectedIndex == 0) {
        showError(topic, "Choose what your message is about.");
        if (!firstProblem) firstProblem = topic;
    }
 
    if (message.value.length < 10) {
        showError(message, "Write a message of at least 10 characters.");
        if (!firstProblem) firstProblem = message;
    }
 
    // something needs fixing: put the cursor in the first field with a problem
    if (firstProblem) {
        firstProblem.focus();
        return false;
    }
 
    // everything is valid: thank the visitor and clear the form
    alert("Thank you, " + name.value + "! We got your message and will reply within one business day.");
    name.value = "";
    email.value = "";
    phone.value = "";
    topic.selectedIndex = 0;
    message.value = "";
    return false;
}

// setUpContact: builds the hours and connects the form to validation function
function setUpContact() {
    showHours();
    document.getElementById("contact-form").onsubmit = validateContact;
}

// run this whenever the page loads
window.addEventListener("load", setUpContact);