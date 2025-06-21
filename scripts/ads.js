// 一度広告を全て消す
let ads = document.getElementsByClassName('ads-pattern')
for (i = 0; i < ads.length; i++) {
    ads[i].style.display = 'none';
}

// 広告をランダムに選ぶ
function randomAdsOpen() {
    document.getElementById('ads').style.display = 'block';
    let num = Math.floor(Math.random() * ads.length);
    ads[num].style.display = 'block';
};

// 広告出現確率
let ads_p = 0.25;

// 広告抽選の周期[ms]
let ads_spantime = 10000;

// 広告出現の確率抽選
function adsOpenTimeout(timeout) {
    setTimeout(() => {
        let r = Math.random();
        if (0 <= r && r < ads_p) {
            randomAdsOpen();
        } else {
            adsOpenTimeout(ads_spantime);
        }
    }, timeout);
};
adsOpenTimeout(1000);

// バツボタンで広告を消す
document.getElementById('ads-close').addEventListener('click', function () {
    document.getElementById('ads').style.display = 'none';
    adsOpenTimeout(ads_spantime);
    for (i = 0; i < ads.length; i++) {
        ads[i].style.display = 'none';
    }
});
