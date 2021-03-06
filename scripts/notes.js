const {
    isUndefined
} = require("util");
var csvsync = require('csvsync');
const fs = require("fs");
const path = require('path');


// splice func used to replace i with id later
if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

// takes in note, adds it to database
function addnote(text) {
    // check for note not to be blank
    if (text.length < 1) {
        return;
    }

    // process csv file data
    let rawdata = fs.readFileSync(path.join(__dirname,'..', 'databases', 'notedb.csv'));
    var allnotes = csvsync.parse(rawdata);

    // format note for file and add it
    var formatted = "<li onclick=\"delnote()\" class=\"row\" id=\"item\">" + text + "</li>";
    const data = [formatted];

    allnotes.push(data)

    // // write data back to file
    var csv = csvsync.stringify(allnotes);
    fs.writeFileSync(path.join(__dirname,'..', 'databases', 'notedb.csv'), csv);

    // refresh notes on page
    shownotes();
}

// takes in index of a note and removes it from db
function delnote(id) {
    // process csv file data
    let rawdata = fs.readFileSync(path.join(__dirname, '..','databases', 'notedb.csv'));
    var allnotes = csvsync.parse(rawdata);

    // remove idth element
    allnotes.splice(id, 1);

    // write changes back to file
    var csv = csvsync.stringify(allnotes);
    fs.writeFileSync(path.join(__dirname, '..', 'databases', 'notedb.csv'), csv);

    // refresh notes on page
    shownotes();
}

// takes in notes from database and sends them to unordered list to be displayed
function shownotes() {
    // process csv file data
    let rawdata = fs.readFileSync(path.join(__dirname,'..','databases', 'notedb.csv'));
    var allnotes = csvsync.parse(rawdata);
    console.log(allnotes);
    console.log()
    if(allnotes[0] == "")
    {
        document.getElementById("note-ul").innerHTML = "";
        return;
    }

    // set parsed data, innitialize string
    var listtostring = "";

    // iterate for each note to add index
    for (i = 0; i < allnotes.length; i++) {
        allnotes[i] += "";
        listtostring += allnotes[i].splice(21, 0, i);
    }

    // place the info in the ul
    document.getElementById("note-ul").innerHTML = listtostring;
    // console.log(listtostring)

}
