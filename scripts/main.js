// 出席システム関連
let url = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';


// 初回アクセス
if (localStorage.classlist == undefined) {
    localStorage.classlist = JSON.stringify([])
}


// 登録された講義室があるときに追加するhtml文
function registHTML(classNum) {
    return `<div class="room-box sur" id="${classNum}"><p class="div-title">${classNum}講義室</p><p class="line-spacing"><a href="https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}" title="${classNum}講義室" target="_blank" rel="noopener noreferrer">${classNum}の出席登録へ</a></p><p class="btn-area"><button class="btn btn-normal" title="講義室のURLをコピーする" onclick="copyRoomUrl('${classNum}');">URLをコピー</button></p><p class="btn-area"><button class="btn btn-small btn-red" title="講義室を削除する" onclick="confirmDelete('${classNum}');">講義室を削除</button></p></div>`;
};


// 一つも登録されてないときに追加するhtml文
function nothingHTML() {
    return '<div class="nothing-box sur" id="nothing"><p class="div-title">講義室が<span class="bold">登録されていません</span></p><p class="line-spacing">下記から登録してください</p></div>';
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


// 講義室の登録
document.getElementById('register-btn').addEventListener('click', function () {
    let classNum = document.getElementById('regist-class-num').value;
    if (Number(classNum)) {
        document.getElementById('regist').insertAdjacentHTML('beforebegin', registHTML(classNum));
        let classlist = JSON.parse(localStorage.classlist);
        if (classlist.length == 0) {
            document.getElementById('nothing').remove();
        }
        classlist.push(classNum);
        localStorage.classlist = JSON.stringify(classlist);
        document.getElementById('regist-class-num').value = '';
        alertOpen(`${classNum}講義室を登録しました。`);
    } else {
        alertOpen('数字を入力してください。');
    }
})


// URLのコピー
function copyRoomUrl(classNum) {
    navigator.clipboard.writeText(`https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}`);
}


// 講義室の削除の関数
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


// 削除ボタン押下時
function confirmDelete(classNum) {
    confirmOpen(`${classNum}講義室を削除しますか？`, ['delete', classNum]);
}


// 講義室一括削除ボタン押下時
document.getElementById('delete-room-all').addEventListener('click', function () {
    let classlist = JSON.parse(localStorage.classlist);
    if (classlist.length == 0) {
        alertOpen('削除する講義室がありません。');
    } else {
        confirmOpen('本当に全ての講義室を削除しますか？', ['delete-all', -1]);
    }
})


// クイック出席
document.getElementById('input-jump').addEventListener('click', function () {
    let classNum = document.getElementById('input-class-num').value;
    window.open(url + classNum);
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
let id;
function confirmOpen(confirmText, identification) {
    document.getElementById('confirm').style.display = 'block';
    document.getElementById('confirm-text').textContent = confirmText;
    id = identification;
};

function confirmClose() {
    document.getElementById('confirm').style.display = 'none';
};

document.getElementById('confirm-x').addEventListener('click', confirmClose)
document.getElementById('confirm-no').addEventListener('click', confirmClose)

document.getElementById('confirm-yes').addEventListener('click', function () {
    confirmClose();
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
