// ライトテーマ
function themeLight() {
    for (i = 0; i < document.getElementsByClassName('theme-main').length; i++) {
        document.getElementsByClassName('theme-main')[i].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('theme-main')[i].style.color = '#000000';
    }
    for (i = 0; i < document.getElementsByClassName('theme-modal').length; i++) {
        document.getElementsByClassName('theme-modal')[i].style.backgroundColor = '#f4f4f4';
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
    for (i = 0; i < document.getElementsByClassName('theme-modal').length; i++) {
        document.getElementsByClassName('theme-modal')[i].style.backgroundColor = '#2f2f2f';
        document.getElementsByClassName('theme-modal')[i].style.color = '#ffffff';
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
}, 100);
