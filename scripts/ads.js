// 広告出現確率（割合）
let ads_p = 0.9;

// クエリパラメータにno-adsが含まれるとき、広告を無効にする
if (location.search.includes("no-ads")) {
    ads_p = 0;
}


// 広告抽選の周期[ms]
let ads_spantime = 12000;




// 広告リスト
adsList = [
    {
        title: "1か月で10kg以上痩せる？！",
        url: "https://www.kobayashi.co.jp/seihin/choleste/",
        image: "medicine.png",
        text: ["1か月で10kg以上痩せる？！", "本気で変わりたいあなたへ！", "今だけなんと20%オフ！", "買うなら今！！！"]
    },
    {
        title: "駅近徒歩3分！通勤通学に便利！",
        url: "https://suumo.jp/chiba/",
        image: "house.jpg",
        text: ["駅徒歩3分！通勤通学に便利！", "乗り換えなしで都心へ直通！", "大型ショッピングモールまで車10分！", "安全セキュリティオートロック付！"]
    },
    {
        title: "うちの研究室…一年半、大きな研究成果を出してません！",
        url: "https://ics-cit.jp/ics/facultymember/miura/",
        image: "miura_smile.jpg",
        text: ["うちの研究室…一年半、大きな研究成果を出してません！", "マコモ研究室って知ってますか？", "あと、実験器具は3年間変えてません！", "なんと、windows7を使っています！"]
    }
]


// 広告に用いるHTML文
function adsHTML(title, url, image, text) {
    html = `
        <a href="${url}" title="${title}" target="_blank" rel="noopener noreferrer"><img src="images/${image}" class="img" alt="${title}"></a>
        <div class="ads-text-content">
    `;
    for (let i = 0; i < text.length; i++) {
        html += `<p class="content-text">${text[i]}</p>`;
    }
    return html;
}


// 広告をランダムに選ぶ
function randomAdsOpen() {
    document.getElementById("ads").style.display = "flex";
    let num = Math.floor(Math.random() * adsList.length);
    let ads = adsList[num];
    document.getElementById("random-ads").insertAdjacentHTML("beforeend", adsHTML(ads.title, ads.url, ads.image, ads.text));
    scroll_disable();
};


// 広告出現の確率抽選
function adsOpenTimeout(timeout) {
    setTimeout(() => {
        let r = Math.random(); // 0 ~ 1
        if (0 <= r && r < ads_p && document.getElementById("alert").style.display != "block" && document.getElementById("confirm").style.display != "block") {
            randomAdsOpen();
        } else {
            adsOpenTimeout(ads_spantime);
        }
    }, timeout);
};

if (ads_p != 0) {
    adsOpenTimeout(1000);
}


// バツボタンで広告を消す
document.getElementById("ads-close").addEventListener("click", function () {
    document.getElementById("ads").style.display = "none";
    adsOpenTimeout(ads_spantime);
    let ads = document.getElementById("random-ads");
    while (ads.firstChild) {
        ads.removeChild(ads.firstChild);
    }
    scroll_able();
});