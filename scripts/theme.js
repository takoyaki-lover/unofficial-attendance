// ライトテーマ
function themeLight() {
    for (i = 0; i < document.getElementsByClassName('theme-main').length; i++) {
        document.getElementsByClassName('theme-main')[i].style.backgroundColor = '#fafafa';
        document.getElementsByClassName('theme-main')[i].style.color = '#000000';
    }
    themeHeader = document.getElementsByClassName("theme-header");
    for (let i = 0; i < themeHeader.length; i++) {
        themeHeader[i].style.backgroundColor = "#e8e8e8";
    }
    for (i = 0; i < document.getElementsByClassName('theme-modal').length; i++) {
        document.getElementsByClassName('theme-modal')[i].style.backgroundColor = '#f0f0f0';
        document.getElementsByClassName('theme-modal')[i].style.color = '#000000';
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
    for (let i = 0; i < themeHeader.length; i++) {
        themeHeader[i].style.backgroundColor = "#2f2f2f";
    }
    for (i = 0; i < document.getElementsByClassName('theme-modal').length; i++) {
        document.getElementsByClassName('theme-modal')[i].style.backgroundColor = '#2f2f2f';
        document.getElementsByClassName('theme-modal')[i].style.color = '#ffffff';
    }
    for (i = 0; i < document.getElementsByClassName('sur').length; i++) {
        document.getElementsByClassName('sur')[i].style.borderColor = '#ffffff';
    }
};


// 初回アクセス時はシステム同期に設定する
if (localStorage.currenttheme == undefined) {
    localStorage.currenttheme = "system";
}


// デバイスのテーマを取得して適用
let currentTheme = localStorage.currenttheme;

function themeJudge() {
    if (currentTheme == "system") {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            themeLight();
        } else {
            themeDark();
        }
        document.getElementById('theme-select').options[0].selected = true;
    } else if (currentTheme == "light") {
        themeLight();
        document.getElementById('theme-select').options[1].selected = true;
    } else if (currentTheme == "dark") {
        themeDark();
        document.getElementById('theme-select').options[2].selected = true;
    }
};

themeJudge();
setInterval(() => {
    themeJudge();
}, 100);


// テーマが変更されたとき
document.getElementById('theme-select').addEventListener('change', function () {
    currentTheme = document.getElementById('theme-select').value;
    themeJudge();
    localStorage.currenttheme = document.getElementById('theme-select').value;
});
