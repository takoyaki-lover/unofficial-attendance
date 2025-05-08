/*
// サーバー時間と端末時間の差を取得
let request = new XMLHttpRequest();
request.open('HEAD', window.location.href, true);
request.send();
request.onreadystatechange = function () {
    if (this.readyState === 4) {
        let serverDate = new Date(request.getResponseHeader('Date'));
        console.log(serverDate);
        localStorage.gap = serverDate.getTime() - new Date().getTime();
        document.getElementById('success').style.display = 'inline';
        document.getElementById('failure').style.display = 'none';
    } else {
        document.getElementById('success').style.display = 'none';
        document.getElementById('failure').style.display = 'inline';
    }
}

// サーバー時間を表示
function displayServerTime() {
    let date = new Date(new Date().getTime() + Number(localStorage.gap));
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let dayOfWeek = date.getDay();
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');

    document.getElementById('s-y').textContent = year;
    document.getElementById('s-m').textContent = month;
    document.getElementById('s-d').textContent = day;

    let week = [0, 0, 0, 0, 0, 0, 0];
    week.splice(dayOfWeek, 1, 1);
    let documentIds = ['s-sun', 's-mon', 's-tue', 's-wed', 's-thu', 's-fri', 's-sat'];
    for (i = 0; i < 7; i++) {
        if (week[i] == 1) {
            document.getElementById(documentIds[i]).style.display = 'inline';
        } else {
            document.getElementById(documentIds[i]).style.display = 'none';
        }
    }

    document.getElementById('s-h').textContent = hour;
    document.getElementById('s-mi').textContent = minute;
    document.getElementById('s-s').textContent = second;
};
*/

// クライアント（端末）の時間を表示
function displayClientTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let dayOfWeek = date.getDay();
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');
    document.getElementById('c-y').textContent = year;
    document.getElementById('c-m').textContent = month;
    document.getElementById('c-d').textContent = day;

    let week = [0, 0, 0, 0, 0, 0, 0];
    week.splice(dayOfWeek, 1, 1);
    let documentIds = ['c-sun', 'c-mon', 'c-tue', 'c-wed', 'c-thu', 'c-fri', 'c-sat'];
    for (i = 0; i < 7; i++) {
        if (week[i] == 1) {
            document.getElementById(documentIds[i]).style.display = 'inline';
        } else {
            document.getElementById(documentIds[i]).style.display = 'none';
        }
    }

    document.getElementById('c-h').textContent = hour;
    document.getElementById('c-mi').textContent = minute;
    document.getElementById('c-s').textContent = second;
};

//displayServerTime();
displayClientTime();
setInterval(() => {
    //displayServerTime();
}, 1);
setInterval(() => {
    displayClientTime();
}, 1);
