const {
    isUndefined
} = require("util");
var csvsync = require('csvsync');
const fs = require("fs");
const path = require('path');

// takes in notes from database and sends them to unordered list to be displayed
function showschedule() {
    // process csv file data
    let rawdata = fs.readFileSync(path.join(__dirname, '..','databases', 'scheduledb.csv'));

    var periods = csvsync.parse(rawdata);

    //initialize empty string
    var listtostring = "";

    // iterate and format each period in schedule
    for (i = 0; i < periods.length; i++) {
        if (i === 8) {
            continue;
        }
        listtostring += "<a href=\"" + periods[i][1] + "\"><li class=\"row\" id=\"period\">" + periods[i][0] + "</li></a>";
    }

    // add edit feature
    listtostring += "<li class=\"row\" id=\"edit\" onclick=\"openedit()\"> Edit</li>"

    // display in page
    document.getElementById("schedule-ul").innerHTML = listtostring;
    // console.log(listtostring);
}

function renderedit() {
    // process csv file data
    let rawdata = fs.readFileSync(path.join(__dirname,'..', 'databases', 'scheduledb.csv'));
    var periods = csvsync.parse(rawdata);


    // load information by period
    document.getElementById("p1name").value = periods[0][0];
    document.getElementById("p1link").value = periods[0][1];

    document.getElementById("p2name").value = periods[1][0];
    document.getElementById("p2link").value = periods[1][1];

    document.getElementById("p3name").value = periods[2][0];
    document.getElementById("p3link").value = periods[2][1];

    document.getElementById("p4name").value = periods[3][0];
    document.getElementById("p4link").value = periods[3][1];

    document.getElementById("p5name").value = periods[4][0];
    document.getElementById("p5link").value = periods[4][1];

    document.getElementById("p6name").value = periods[5][0];
    document.getElementById("p6link").value = periods[5][1];

    document.getElementById("p7name").value = periods[6][0];
    document.getElementById("p7link").value = periods[6][1];

    document.getElementById("accesslink").value = periods[7][1];


}

function formsubmit() {
    // innitialize array that will contain form data
    var schedule = []

    // innitialize all slots in 2d array
    for (var i = 0; i < 9; i++) {
        schedule[i] = [];
    }

    // add each period title and link to array
    schedule[0][0] = document.getElementById("p1name").value;
    schedule[0][1] = document.getElementById("p1link").value;

    schedule[1][1] = document.getElementById("p2link").value;
    schedule[1][0] = document.getElementById("p2name").value;

    schedule[2][0] = document.getElementById("p3name").value;
    schedule[2][1] = document.getElementById("p3link").value;

    schedule[3][0] = document.getElementById("p4name").value;
    schedule[3][1] = document.getElementById("p4link").value;

    schedule[4][0] = document.getElementById("p5name").value;
    schedule[4][1] = document.getElementById("p5link").value;

    schedule[5][0] = document.getElementById("p6name").value;
    schedule[5][1] = document.getElementById("p6link").value;

    schedule[6][0] = document.getElementById("p7name").value;
    schedule[6][1] = document.getElementById("p7link").value;

    schedule[7][0] = "Access";
    schedule[7][1] = document.getElementById("accesslink").value;

    schedule[8][0] = "Lunch";
    schedule[8][1] = "#"

    // write form into file
    console.log(schedule);
    var csv = csvsync.stringify(schedule);
    fs.writeFileSync(path.join(__dirname, '..','databases', 'scheduledb.csv'), csv);

    // refresh schedule on page
    showschedule();
}

// open and close edit menu
function openedit() {
    document.getElementById("sidemenu").style.width = "33.33%";
}

function closeedit() {
    document.getElementById("sidemenu").style.width = "0";
}

function burgertox() {
    document.getElementById("iconburger").src = "resources/close.svg"
    document.getElementById("burgerholder").setAttribute( "onClick", "xtoburger();" );
    
    openedit();
}

function xtoburger() {
    document.getElementById("iconburger").src = "resources/burger.svg"
    document.getElementById("burgerholder").setAttribute( "onClick", "burgertox();" );

    closeedit();
}