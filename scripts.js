function themeLight() {
    for (i = 0; i < document.getElementsByClassName('theme-main').length; i++) {
        document.getElementsByClassName('theme-main')[i].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('theme-main')[i].style.color = '#000000';
    }
    for (i = 0; i < document.getElementsByClassName('theme-ads').length; i++) {
        document.getElementsByClassName('theme-ads')[i].style.backgroundColor = '#f4f4f4';
        document.getElementsByClassName('theme-ads')[i].style.color = '#000000';
    }
    for (i = 0; i < document.getElementsByClassName('sur').length; i++) {
        document.getElementsByClassName('sur')[i].style.borderColor = '#000000';
    }
};

function themeDark() {
    for (i = 0; i < document.getElementsByClassName('theme-main').length; i++) {
        document.getElementsByClassName('theme-main')[i].style.backgroundColor = '#222222';
        document.getElementsByClassName('theme-main')[i].style.color = '#ffffff';
    }
    for (i = 0; i < document.getElementsByClassName('theme-ads').length; i++) {
        document.getElementsByClassName('theme-ads')[i].style.backgroundColor = '#2f2f2f';
        document.getElementsByClassName('theme-ads')[i].style.color = '#ffffff';
    }
    for (i = 0; i < document.getElementsByClassName('sur').length; i++) {
        document.getElementsByClassName('sur')[i].style.borderColor = '#ffffff';
    }
};

function themeJudge() {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        themeLight();
    } else {
        themeDark();
    }
};

themeJudge();

setInterval(() => {
    themeJudge();
}, 1000);

let url = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';

document.getElementById('copy-622').addEventListener('click', function () {
    navigator.clipboard.writeText(url + '622');
});

document.getElementById('copy-642').addEventListener('click', function () {
    navigator.clipboard.writeText(url + '642');
});

document.getElementById('copy-614').addEventListener('click', function () {
    navigator.clipboard.writeText(url + '614');
});

let timeoutId;

document.getElementById('input-jump').addEventListener('click', function () {
    let classNum = document.getElementById('class-num').value;
    let date = new Date();
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let today = year + month + day;
    if (classNum == today) {
        localStorage.admin = 1;
        clearTimeout(timeoutId);
    } else if (classNum == -1) {
        localStorage.admin = 0;
        adsOpenTimeout(5000);
    } else {
        window.open(url + classNum);
    }
});

document.getElementById('copy-input-num').addEventListener('click', function () {
    let classNum = document.getElementById('class-num').value;
    navigator.clipboard.writeText(url + classNum);
});

function adsOpen() {
    document.getElementById('ads').style.display = 'block';
};

function adsOpenTimeout(timeout) {
    timeoutId = setTimeout(() => {
        adsOpen();
    }, timeout);
};

if (localStorage.admin != 1) {
    adsOpenTimeout(1000);
};

document.getElementById('ads-close').addEventListener('click', function () {
    document.getElementById('ads').style.display = 'none';
    if (localStorage.admin != 1) {
        adsOpenTimeout(7000);
    }
});
