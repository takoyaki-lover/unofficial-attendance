// 広告の出現・消去
let ads = document.getElementsByClassName('ads-pattern')
for (i = 0; i < ads.length; i++) {
    ads[i].style.display = 'none';
}

function randomAdsOpen() {
    document.getElementById('ads').style.display = 'block';
    let r = Math.random();
    if (0 <= r && r < 0.5) {
        ads[0].style.display = 'block';
    } else if (0.5 <= r && r <= 1) {
        ads[1].style.display = 'block';
    }
};

function adsOpenTimeout(timeout) {
    setTimeout(() => {
        let r = Math.random();
        if (0 <= r && r < 0.15) {
            randomAdsOpen();
        } else {
            adsOpenTimeout(6000);
        }
    }, timeout);
};
adsOpenTimeout(1000);

document.getElementById('ads-close').addEventListener('click', function () {
    document.getElementById('ads').style.display = 'none';
    adsOpenTimeout(6000);
    for (i = 0; i < ads.length; i++) {
        ads[i].style.display = 'none';
    }
});
