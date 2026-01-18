// 出席システム関連のURL
let url = "https://attendance.is.it-chiba.ac.jp/attendance/class_room/";


// 初回アクセス
if (localStorage.classlist == undefined) {
    localStorage.classlist = JSON.stringify([]);
}

// 初回アクセスおよび例外処理
if (localStorage.descriptionlist == undefined || JSON.parse(localStorage.classlist).length != JSON.parse(localStorage.descriptionlist).length) {
    length = JSON.parse(localStorage.classlist).length;
    array = [];
    for (let i = 0; i < length; i++) {
        array.push("");
    }
    localStorage.descriptionlist = JSON.stringify(array);
}


// 登録された講義室があるときに追加するHTML文
function registHTML(classNum, description, id) {
    return `
        <div class="room-box box" id="${id}">
            <p class="div-title">${classNum}講義室</p>
            <p class="line-spacing">
                <a href="https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}" title="${classNum}講義室" target="_blank" rel="noopener noreferrer">${classNum}の出席登録へ</a>
            </p>
            <button class="btn btn-normal btn-copy" title="${classNum}講義室のURLをコピーする" onclick="copyRoomUrl('${classNum}');">URLをコピー</button><br>
            <button class="btn btn-small btn-red btn-delete" title="${classNum}講義室を削除する" onclick="pushDelete(${id}, '${classNum}');">講義室を削除</button><br>
            <span class="line-spacing desc-title">備考:</span><input class="input input-desc" id="desc-${id}" title="説明" placeholder="説明を追加" value="${description}">
        </div>
    `;
};


// 一つも登録されてないときに追加するHTML文
function nothingHTML() {
    return `
        <div class="nothing-box box" id="nothing">
            <p class="div-title">講義室が<span class="bold">登録されていません</span></p>
            <p class="line-spacing">下記から登録してください</p>
        </div>
    `;
};


// 教室を描写する
function renderClass(HTML) {
    document.getElementById("class-area").insertAdjacentHTML("beforeend", HTML);
}


// ローカルストレージを読み込んで描写
function loadClass() {
    let classlist = JSON.parse(localStorage.classlist);
    let descriptionlist = JSON.parse(localStorage.descriptionlist);
    let classNum;
    let description;
    for (i = 0; i < classlist.length; i++) {
        classNum = classlist[i];
        if (descriptionlist[i] === undefined) {
            description = "";
        } else {
            description = descriptionlist[i];
        }
        renderClass(registHTML(classNum, description, i));
    }
    if (classlist.length == 0) {
        renderClass(nothingHTML());
    }
};
loadClass();


// 講義室の登録
document.getElementById("register-btn").addEventListener("click", function () {
    let classlist = JSON.parse(localStorage.classlist);
    let descriptionlist = JSON.parse(localStorage.descriptionlist);
    let classNum = document.getElementById("regist-class-num").value;
    let description = document.getElementById("regist-desc").value;
    let registeredNum = classlist.length;
    if (Number(classNum)) {
        renderClass(registHTML(classNum, description, registeredNum));
        if (classlist.length == 0) {
            document.getElementById("nothing").remove();
        }
        classlist.push(classNum);
        descriptionlist.push(description);
        localStorage.classlist = JSON.stringify(classlist);
        localStorage.descriptionlist = JSON.stringify(descriptionlist);
        document.getElementById("regist-class-num").value = "";
        document.getElementById("regist-desc").value = "";
        alertOpen(`${classNum}講義室を登録しました。`);
    } else if (classNum == "") {
        alertOpen("教室番号を入力してください。");
    } else {
        alertOpen("数字を入力してください。");
    }
})


// 備考欄
document.querySelectorAll(".input-desc").forEach(function (input) {
    input.addEventListener("input", function() {
        let descriptionlist = JSON.parse(localStorage.descriptionlist);
        for (let i = 0; i < descriptionlist.length; i++) {
            let description = document.getElementById(`desc-${i}`).value;
            descriptionlist[i] = description;
            localStorage.descriptionlist = JSON.stringify(descriptionlist);
        }
    })
})


// URLのコピー
function copyRoomUrl(classNum) {
    navigator.clipboard.writeText(`https://attendance.is.it-chiba.ac.jp/attendance/class_room/${classNum}`);
}


// 講義室の削除の関数
function deleteRoom(id) {
    let classlist = JSON.parse(localStorage.classlist);
    let descriptionlist = JSON.parse(localStorage.descriptionlist);
    classlist.splice(id, 1);
    descriptionlist.splice(id, 1);
    localStorage.classlist = JSON.stringify(classlist);
    localStorage.descriptionlist = JSON.stringify(descriptionlist);
    location.reload();
}


// 削除ボタン押下時
function pushDelete(id, classNum) {
    confirmOpen(`${classNum}講義室を削除しますか？`, ["delete", id]);
}


// 講義室一括削除ボタン押下時
document.getElementById("delete-room-all").addEventListener("click", function () {
    let classlist = JSON.parse(localStorage.classlist);
    if (classlist.length == 0) {
        alertOpen("講義室が登録されていないため、削除できません。");
    } else {
        confirmOpen("本当に全ての講義室を削除しますか？", ["delete-all", -1]);
    }
})


// クイック出席
document.getElementById("input-jump").addEventListener("click", function () {
    let classNum = document.getElementById("input-class-num").value;
    window.open(url + classNum);
});


// コピーボタンを押したとき
document.getElementById("copy-input-num").addEventListener("click", function () {
    let classNum = document.getElementById("input-class-num").value;
    navigator.clipboard.writeText(url + classNum);
});
