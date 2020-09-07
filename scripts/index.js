// get page name
var pagepath = window.location.pathname;
var page = pagepath.split("/").pop();

// default path
var filepathburger = "../resources/burger.svg"
var filepathclose = "../resources/close.svg"

// if current page is index adjust file path
if (page == "index.html") {
    filepathclose = "resources/close.svg"
}
if (page == "index.html") {
    filepathburger = "resources/burger.svg"
}


// open and close edit menu
function openmenu() {
    document.getElementById("sidemenu").style.width = "33.33%";
    if (page == "index.html") {
        setTimeout(function () {
            document.getElementById("sidemenu").style.borderLeft = "none";
        }, 350);
    }

}

function closemenu() {
    document.getElementById("sidemenu").style.borderLeft = "0.5px solid";
    document.getElementById("sidemenu").style.width = "0";
}

function burgertox() {

    document.getElementById("iconburger").src = filepathclose;
    document.getElementById("burgerholder").setAttribute("onClick", "xtoburger();");

    openmenu();
}

function xtoburger() {
    document.getElementById("iconburger").src = filepathburger;
    document.getElementById("burgerholder").setAttribute("onClick", "burgertox();");

    closemenu();
}

// call on magnifying glass to focus on search bar
function getfocus() {
    document.getElementById("searchbar").focus();
}

// open search bar applications
function opensearchapps() {
    document.getElementById("searchmenu").style.height = "100%";
    document.getElementById("searchclose").style.visibility = "visible";
}

// close search bar applications
function closesearchapps() {
    document.getElementById("searchmenu").style.height = 0;
    setTimeout(function () {
        document.getElementById("searchclose").style.visibility = "hidden";
    }, 350)
}

// clear search bar
function clearsearch() {
    // clear it
    document.getElementById("searchbar").value = "";

    // reset bar
    closesearchapps("");
    setTimeout(function () {
        searchkey("");
    }, 350)
}

// filter everytime key is pressed
function searchkey() {
    var input, filter, ul, li, a, i, txtValue;
    var words = ["innit"]
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("applist");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            words.push(li[i].id);
        } else {

            li[i].style.display = "none";
        }
    }
    if (!words.includes("memmisc")) {
        document.getElementById("secmisc").style.display = "none";
    } else {
        document.getElementById("secmisc").style.display = "";
    }
    if (!words.includes("memgeneral")) {
        document.getElementById("secgeneral").style.display = "none";
    } else {
        document.getElementById("secgeneral").style.display = "";
    }
    if (!words.includes("memresources")) {
        document.getElementById("secresources").style.display = "none";
    } else {
        document.getElementById("secresources").style.display = "";
    }
    if (!words.includes("memgoogle")) {
        document.getElementById("secgoogle").style.display = "none";
    } else {
        document.getElementById("secgoogle").style.display = "";
    }
    if (!words.includes("memmath")) {
        document.getElementById("secmath").style.display = "none";
    } else {
        document.getElementById("secmath").style.display = "";
    }
}