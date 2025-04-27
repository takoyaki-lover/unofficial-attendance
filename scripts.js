// ライトテーマ
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

// ダークテーマ
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

// デバイスのテーマを取得し適用
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


// サーバー時間を表示

let intervalId;
let request = new XMLHttpRequest();
request.open('HEAD', window.location.href, true);
request.send();
request.onreadystatechange = function () {
    intervalId = setInterval(() => {
        if (this.readyState === 4) {
            let serverDate = new Date(request.getResponseHeader('Date'));
            localStorage.gap = serverDate.getTime() - new Date().getTime();
            document.getElementById('success').style.display = 'inline';
            document.getElementById('failure').style.display = 'none';
        } else {
            document.getElementById('success').style.display = 'none';
            document.getElementById('failure').style.display = 'inline';
        }
    }, 1);
    setTimeout(() => {
        clearInterval(intervalId)
    }, 1000);
}



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

displayServerTime();
displayClientTime();
setInterval(() => {
    displayClientTime();
}, 1);

setInterval(() => {
    displayServerTime();
}, 1);

// 出席システム関連
let url = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';

if (localStorage.classlist == undefined) {
    localStorage.classlist = JSON.stringify([])
}

// 追加するhtml文
function registHTML(classNum) {
    return `<div class="room-box sur" id="${classNum}"><p class="div-title">${classNum}講義室</p><p class="line-spacing"><a href="https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}" target="_blank" rel="noopener noreferrer">${classNum}の出席登録へ</a></p><p class="btn-area"><button class="btn btn-normal" onclick="navigator.clipboard.writeText('https:\/\/attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}')">URLをコピー</button></p><p class="btn-area"><button class="btn btn-small" onclick="deleteRoom(${classNum});">教室を削除</button></p></div>`;
};

function nothingHTML() {
    return '<div class="nothing-box sur" id="nothing"><p class="div-title">まだ教室が<span class="bold">登録されていません</span></p><p class="line-spacing">下記から登録してください</p></div>';
};

// 配列に従って描写
function registered() {
    let classlist = JSON.parse(localStorage.classlist);
    let classNum;
    for (i = 0; i < classlist.length; i++) {
        classNum = classlist[i];
        document.getElementById('regist').insertAdjacentHTML('beforebegin', registHTML(classNum));
    }
    if (classlist.length == 0) {
        document.getElementById('regist').insertAdjacentHTML('beforebegin', nothingHTML());
    }
};
registered();

document.getElementById('regist-input-num').addEventListener('click', function () {
    let classNum = Number(document.getElementById('regist-class-num').value);
    if (Number(classNum)) {
        document.getElementById('regist').insertAdjacentHTML('beforebegin', registHTML(classNum))
        let classlist = JSON.parse(localStorage.classlist);
        classlist.push(classNum);
        localStorage.classlist = JSON.stringify(classlist);
    }
    document.getElementById('regist-class-num').value = '';
    location.reload();
})

function deleteRoom(classNum) {
    let classlist = JSON.parse(localStorage.classlist);
    let length = classlist.length;
    for (i = 0; i < length; i++) {
        if (classlist[i] == classNum) {
            classlist.splice(i, 1);
        }
    }
    localStorage.classlist = JSON.stringify(classlist);
    location.reload();
}

document.getElementById('delete-room-all').addEventListener('click', function () {
    let classlist = JSON.parse(localStorage.classlist);
    let length = classlist.length;
    for (i = 0; i < length; i++) {
        classlist.pop();
    }
    localStorage.classlist = JSON.stringify(classlist);
    location.reload();
})


// 教室番号の入力と広告のストップ
let timeoutId;

document.getElementById('input-jump').addEventListener('click', function () {
    let classNum = document.getElementById('input-class-num').value;
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
    let classNum = document.getElementById('input-class-num').value;
    navigator.clipboard.writeText(url + classNum);
});

// 広告の出現・消去
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
