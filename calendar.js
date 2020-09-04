const fs = require('fs');
const path = require('path');
let rawdata = fs.readFileSync((path.join(__dirname, 'calendar.json')));
let calendar = JSON.parse(rawdata);
var csvsync = require('csvsync');


function updatetime() {
    // get defaults for all time
    var daymonth = Date.prototype.getDate.bind(new Date);
    var dayweek = Date.prototype.getDay.bind(new Date);
    var year = Date.prototype.getFullYear.bind(new Date);
    var hour = Date.prototype.getHours.bind(new Date);
    var month = Date.prototype.getMonth.bind(new Date);
    var minute = Date.prototype.getMinutes.bind(new Date);
    var second = Date.prototype.getSeconds.bind(new Date);
    // get year
    var newYear = year();

    // get array of monthnames and set month to it
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var newMonth = monthNames[month()] += " " + daymonth();

    // get arrawy of weeknames and set day to it
    var dayweekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var newDayweek = dayweekNames[dayweek()];

    // combine time and minutes, handle am and pm for 12 hour time
    var newHour = hour();
    var amormpm = "am";
    if (hour() >= 13) {
        newHour = hour() - 12;
    }
    if (hour() >= 12) {
        amorpm = "pm";
    }
    var newMinute = minute();
    if (minute() < 10) {
        newMinute = "0" + minute();
    }
    var newSecond = second();
    if (second() < 10) {
        newSecond = "0" + second();
    }
    var newTime = newHour + ":" + newMinute + ":" + newSecond + " " + amorpm;

    // assign values to html
    document.getElementById("year").innerHTML = newYear;
    document.getElementById("month").innerHTML = newMonth;
    document.getElementById("day").innerHTML = newDayweek;
    document.getElementById("time").innerHTML = newTime;
    console.log("updating time")
}

function rendercalendar() {
    // get csv file with periods
    let rawdata = fs.readFileSync(path.join(__dirname, 'scheduledb.csv'));
    var periods = csvsync.parse(rawdata);

    // use date to get correct calendar for current day
    var dayweek = Date.prototype.getDay.bind(new Date);
    if (dayweek() > 4) {
        return
    };
    var dayweekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayweekName = dayweekNames[dayweek()].toLowerCase();
    todayCalendar = calendar[0][dayweekName];  
    
    // set the time for each period
    document.getElementById("time1").innerHTML = todayCalendar["block1"]["time"];
    document.getElementById("time2").innerHTML = todayCalendar["block2"]["time"];
    document.getElementById("time3").innerHTML = todayCalendar["block3"]["time"];
    document.getElementById("time4").innerHTML = todayCalendar["block4"]["time"];
    document.getElementById("time5").innerHTML = todayCalendar["block5"]["time"];
    
    // set class names
    document.getElementById("name1").innerHTML = periods[todayCalendar["block1"]["period"]-1][0];
    document.getElementById("name2").innerHTML = periods[todayCalendar["block2"]["period"]-1][0];
    document.getElementById("name3").innerHTML = periods[todayCalendar["block3"]["period"]-1][0];
    document.getElementById("name4").innerHTML = periods[todayCalendar["block4"]["period"]-1][0];
    document.getElementById("name5").innerHTML = periods[todayCalendar["block5"]["period"]-1][0];

    // set class links
    document.getElementById("name1").href = periods[todayCalendar["block1"]["period"]-1][1];
    document.getElementById("name2").href = periods[todayCalendar["block2"]["period"]-1][1];
    document.getElementById("name3").href = periods[todayCalendar["block3"]["period"]-1][1];
    document.getElementById("name4").href = periods[todayCalendar["block4"]["period"]-1][1];
    document.getElementById("name5").href = periods[todayCalendar["block5"]["period"]-1][1];
    
    
    console.log(periods[todayCalendar["block1"]["period"]][0]);
    

}
var dayweek = Date.prototype.getDay.bind(new Date);
var dayweekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayweekName = dayweekNames[dayweek()].toLowerCase();
thing = calendar[0][dayweekName];

console.log(thing["block1"]["period"]);