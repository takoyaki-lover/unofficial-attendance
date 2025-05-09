// 出席システム関連
let url = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';

if (localStorage.classlist == undefined) {
    localStorage.classlist = JSON.stringify([])
}

// 追加するhtml文
function registHTML(classNum) {
    return `<div class="room-box sur" id="${classNum}"><p class="div-title">${classNum}講義室</p><p class="line-spacing"><a href="https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}" title="${classNum}講義室" target="_blank" rel="noopener noreferrer">${classNum}の出席登録へ</a></p><p class="btn-area"><button class="btn btn-normal" title="教室のURLをコピーする" onclick="copyRoomUrl(${classNum});">URLをコピー</button></p><p class="btn-area"><button class="btn btn-small btn-red" title="教室を削除する" onclick="confirmDelete(${classNum});">教室を削除</button></p></div>`;
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

document.getElementById('register-btn').addEventListener('click', function () {
    let classNum = document.getElementById('regist-class-num').value;
    if (Number(classNum)) {
        document.getElementById('regist').insertAdjacentHTML('beforebegin', registHTML(classNum))
        let classlist = JSON.parse(localStorage.classlist);
        classlist.push(classNum);
        localStorage.classlist = JSON.stringify(classlist);
        document.getElementById('regist-class-num').value = '';
        alertOpen(`${classNum}講義室を登録しました。`);
    } else {
        alertOpen('数字を入力してください。');
    }
})

function copyRoomUrl(classNum) {
    navigator.clipboard.writeText(`https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}`);
}

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

function confirmDelete(classNum) {
    confirmOpen(`${classNum}講義室を削除しますか？`, ['delete', classNum]);
}

document.getElementById('delete-room-all').addEventListener('click', function () {
    let classlist = JSON.parse(localStorage.classlist);
    if (classlist.length == 0) {
        alertOpen('削除する教室がありません。');
    } else {
        confirmOpen('本当に全ての教室を削除しますか？', ['delete-all', -1]);
    }
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


// alert
function alertOpen(alertText) {
    document.getElementById('alert').style.display = 'block';
    document.getElementById('alert-text').textContent = alertText;
};

function alertClose() {
    document.getElementById('alert').style.display = 'none';
};

document.getElementById('alert-x').addEventListener('click', alertClose);
document.getElementById('alert-ok').addEventListener('click', alertClose);

// confirm
function confirmOpen(confirmText, identification) {
    document.getElementById('confirm').style.display = 'block';
    document.getElementById('confirm-text').textContent = confirmText;
    localStorage.id = JSON.stringify(identification);
};

function confirmClose() {
    document.getElementById('confirm').style.display = 'none';
};

document.getElementById('confirm-x').addEventListener('click', confirmClose)
document.getElementById('confirm-no').addEventListener('click', confirmClose)

document.getElementById('confirm-yes').addEventListener('click', function () {
    confirmClose();
    let id = JSON.parse(localStorage.id)
    switch (id[0]) {
        case 'delete-all': {
            let classlist = JSON.parse(localStorage.classlist);
            let length = classlist.length;
            for (i = 0; i < length; i++) {
                classlist.pop();
            }
            localStorage.classlist = JSON.stringify(classlist);
            location.reload();
            break;
        }
        case 'delete': {
            deleteRoom(id[1]);
            break;
        }
    }
});


// 広告の出現・消去
function adsOpen() {
    document.getElementById('ads').style.display = 'block';
};

function adsOpenTimeout(timeout) {
    timeoutId = setTimeout(() => {
        let r = Math.random();
        if (r < 0.25) {
            adsOpen();
        } else {
            adsOpenTimeout(5000);
        }
    }, timeout);
};

if (true/*localStorage.admin != 1*/) {
    adsOpenTimeout(1000);
};

document.getElementById('ads-close').addEventListener('click', function () {
    document.getElementById('ads').style.display = 'none';
    if (true/*localStorage.admin != 1*/) {
        adsOpenTimeout(5000);
    }
});
