const fs = require('fs');
const path = require('path');
let rawdata = fs.readFileSync((path.join(__dirname, '..', 'databases', 'calendar.json')));
let calendar = JSON.parse(rawdata);
var csvsync = require('csvsync');
var deletedHTML;
var currentday = 0;

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
    var amorpm = "am";
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
}

function rendercalendar(forceday) {
    // get csv file with periods, set dayweek using date()
    let rawdata = fs.readFileSync(path.join(__dirname, '..', 'databases', 'scheduledb.csv'));
    var periods = csvsync.parse(rawdata);
    var dayweek = Date.prototype.getDay.bind(new Date);


    var daymodifier = 0;
    if (forceday) {
        currentday += forceday;
        daymodifier += currentday;
        document.getElementById("weekenderase").innerHTML = deletedHTML;
    }

    console.log(dayweek() + daymodifier);

    // make daymodifier loop
    while (dayweek() + daymodifier > 6) {
        daymodifier -= 7;
    }
    while (dayweek() + daymodifier < 0) {
        daymodifier += 7;
    }
    console.log(dayweek() + daymodifier)

    // set todays calendar to day on calendar.json
    var dayweekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayweekName = dayweekNames[dayweek() + daymodifier].toLowerCase();
    todayCalendar = calendar[0][dayweekName];
    console.log(dayweekName)

    // use date to get correct calendar for current day
    if (dayweek() + daymodifier == 6 || dayweek() + daymodifier == 0) {
        document.getElementById("date").style = "border-bottom: solid 0.5px;"
        document.getElementById("weekenderase").innerHTML = "<div class=\"center\"><div class=\"centerin2\">It's the weekend, go do something fun 🎉</div></div>";
        return;
    }
    document.getElementById("date").style = "border-bottom: solid 0.5px;"
    // implement friday
    if (dayweek() + daymodifier === 5) {
        // remove borders from last 2 blocks and line
        document.getElementById("block4").style = "border-top: none;"
        document.getElementById("block5").style = "border-top: none;"
        document.getElementById("line").style = "border: none;"

        // remove text from last two elements and add border to compensate
        document.getElementById("block4").innerHTML = "";
        document.getElementById("block5").innerHTML = "";
        document.getElementById("block3").style = "border-bottom: 0.5px solid;"

        // set time for first 3 blocks
        document.getElementById("time1").innerHTML = todayCalendar["block1"]["time"];
        document.getElementById("time2").innerHTML = todayCalendar["block2"]["time"];
        document.getElementById("time3").innerHTML = todayCalendar["block3"]["time"];

        // set name for first 3 blocks
        document.getElementById("name1").innerHTML = periods[todayCalendar["block1"]["period"] - 1][0];
        document.getElementById("name2").innerHTML = periods[todayCalendar["block2"]["period"] - 1][0];
        document.getElementById("name3").innerHTML = periods[todayCalendar["block3"]["period"] - 1][0];

        // set class links for first 3 blocks
        document.getElementById("name1").href = periods[todayCalendar["block1"]["period"] - 1][1];
        document.getElementById("name2").href = periods[todayCalendar["block2"]["period"] - 1][1];
        document.getElementById("name3").href = periods[todayCalendar["block3"]["period"] - 1][1];

        // blank
        document.getElementById("name1").target = "_blank"
        document.getElementById("name2").target = "_blank"
        document.getElementById("name3").target = "_blank"

        // return before loading other periods that would make app crash, render active block
        if (forceday) {
            return
        }
        setactiveblock();
        return;
    }


    // set the time for each period
    document.getElementById("time1").innerHTML = todayCalendar["block1"]["time"];
    document.getElementById("time2").innerHTML = todayCalendar["block2"]["time"];
    document.getElementById("time3").innerHTML = todayCalendar["block3"]["time"];
    document.getElementById("time4").innerHTML = todayCalendar["block4"]["time"];
    document.getElementById("time5").innerHTML = todayCalendar["block5"]["time"];

    // set class names
    document.getElementById("name1").innerHTML = periods[todayCalendar["block1"]["period"] - 1][0];
    document.getElementById("name2").innerHTML = periods[todayCalendar["block2"]["period"] - 1][0];
    document.getElementById("name3").innerHTML = periods[todayCalendar["block3"]["period"] - 1][0];
    document.getElementById("name4").innerHTML = periods[todayCalendar["block4"]["period"] - 1][0];
    document.getElementById("name5").innerHTML = periods[todayCalendar["block5"]["period"] - 1][0];

    // set class links
    document.getElementById("name1").href = periods[todayCalendar["block1"]["period"] - 1][1];
    document.getElementById("name2").href = periods[todayCalendar["block2"]["period"] - 1][1];
    document.getElementById("name3").href = periods[todayCalendar["block3"]["period"] - 1][1];
    document.getElementById("name4").href = periods[todayCalendar["block4"]["period"] - 1][1];
    document.getElementById("name5").href = periods[todayCalendar["block5"]["period"] - 1][1];

    // blank
    document.getElementById("name1").target = "_blank"
    document.getElementById("name2").target = "_blank"
    document.getElementById("name3").target = "_blank"
    document.getElementById("name4").target = "_blank"
    document.getElementById("name5").target = "_blank"

    // render active block
    setactiveblock();


}

function setactiveblock() {
    // if its a timeskip dont run
    if (!currentday == 0) {
        return;
    }

    // get csv file with periods, set dayweek using date()
    let rawdata = fs.readFileSync(path.join(__dirname, '..', 'databases', 'scheduledb.csv'));
    var periods = csvsync.parse(rawdata);

    // get neccesary times
    var dayweek = Date.prototype.getDay.bind(new Date);
    var hour = Date.prototype.getHours.bind(new Date);
    var minute = Date.prototype.getMinutes.bind(new Date);

    // set todays calendar to day on calendar.json
    var dayweekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayweekName = dayweekNames[dayweek()].toLowerCase();
    todayCalendar = calendar[0][dayweekName];

    // Check if day is friday, set var friday to true or false accordingly
    var friday = false;
    if (dayweek() === 5) {
        friday = true;
    }


    // set current time in minutes
    minuteTime = ((hour() * 60) + minute());

    // define recursive checkler to get the active period
    var activeBlockGetter = function () {
        if (minuteTime > todayCalendar["block1"]["gap1"] && minuteTime < todayCalendar["block1"]["gap2"]) {
            return Object.keys(todayCalendar)[0];
        }

        if (minuteTime > todayCalendar["block2"]["gap1"] && minuteTime < todayCalendar["block2"]["gap2"]) {
            return Object.keys(todayCalendar)[1];
        }

        if (minuteTime > todayCalendar["block3"]["gap1"] && minuteTime < todayCalendar["block3"]["gap2"]) {
            return Object.keys(todayCalendar)[2];
        }
        if (!friday) {
            if (minuteTime > todayCalendar["block4"]["gap1"] && minuteTime < todayCalendar["block4"]["gap2"]) {
                return Object.keys(todayCalendar)[3];
            }

            if (minuteTime > todayCalendar["block5"]["gap1"] && minuteTime < todayCalendar["block5"]["gap2"]) {
                return Object.keys(todayCalendar)[4];
            }
        }
    };

    // set active block to var
    var activeBlock = activeBlockGetter();


    // make active block gray
    if (activeBlock) {
        document.getElementById(activeBlock).style = "background-color:#f0f0f0;";

        // handle bottom line dissapearing at third block on friday
        if (friday && activeBlock == "block3") {
            document.getElementById(activeBlock).style = "background-color:#f0f0f0; border-bottom:0.5px solid;";
        }

        // handle top border for first block
        if (activeBlock == "block1") {
            document.getElementById(activeBlock).style = "background-color:#f0f0f0; border-top: none;";
        }


        // loop through all periods to make sure none stay grayed out
        for (var i = 0; i > Object.keys(todayCalendar).length; i++) {

            // if its the active block, dont remove gray
            if (Object.keys(todayCalendar)[i] == activeBlock) {
                continue;
            }
            // otherwise clear gray
            document.getElementById(Object.keys(todayCalendar)[i]).style = "background-color:#f0f0f0; border-bottom:0.5px solid;";
        }

    }
    console.log(Object.keys(todayCalendar).length);
}

function savedeleted() {
    deletedHTML = document.getElementById("weekenderase").innerHTML;
}