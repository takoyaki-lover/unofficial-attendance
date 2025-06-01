// 一度広告を全て消す
let ads = document.getElementsByClassName('ads-pattern')
for (i = 0; i < ads.length; i++) {
    ads[i].style.display = 'none';
}

// 広告をランダムに選ぶ
function randomAdsOpen() {
    document.getElementById('ads').style.display = 'block';
    let r = Math.random();
    let num = Math.floor(r * ads.length);
    ads[num].style.display = 'block';
};

// 広告出現の確率抽選
function adsOpenTimeout(timeout) {
    setTimeout(() => {
        let r = Math.random();
        if (0 <= r && r < 0.15) {
            randomAdsOpen();
        } else {
            adsOpenTimeout(8000);
        }
    }, timeout);
};
adsOpenTimeout(8000);

// バツボタンで広告を消す
document.getElementById('ads-close').addEventListener('click', function () {
    document.getElementById('ads').style.display = 'none';
    adsOpenTimeout(6000);
    for (i = 0; i < ads.length; i++) {
        ads[i].style.display = 'none';
    }
});
