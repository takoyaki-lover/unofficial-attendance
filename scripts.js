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

// 時間を表示させる
function timeDisplay() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let dayOfWeek = date.getDay();
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');
    document.getElementById('current-day').textContent = `${year}/${month}/${day}`;
    switch (dayOfWeek) {
        case 0: {
            document.getElementById('sun').style.display = 'inline';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 1: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'inline';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 2: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'inline';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 3: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'inline';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 4: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'inline';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 5: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'inline';
            document.getElementById('sat').style.display = 'none';
            break;
        }
        case 6: {
            document.getElementById('sun').style.display = 'none';
            document.getElementById('mon').style.display = 'none';
            document.getElementById('tue').style.display = 'none';
            document.getElementById('wed').style.display = 'none';
            document.getElementById('thu').style.display = 'none';
            document.getElementById('fri').style.display = 'none';
            document.getElementById('sat').style.display = 'inline';
            break;
        }
    }
    document.getElementById('current-time').textContent = `${hour}:${minute}:${second}`;
};

timeDisplay();
setInterval(() => {
    timeDisplay();
}, 1);


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

// 追加されていたものを描写
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
    if (classlist.length == 0) {
        document.getElementById('regist').insertAdjacentHTML('beforebegin', nothingHTML());
    }
    location.reload();
}

document.getElementById('delete-room-all').addEventListener('click', function () {
    let classlist = JSON.parse(localStorage.classlist);
    let length = classlist.length;
    for (i = 0; i < length; i++) {
        classlist.pop();
    }
    localStorage.classlist = JSON.stringify(classlist);
    document.getElementById('regist').insertAdjacentHTML('beforebegin', nothingHTML());
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
