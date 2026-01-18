// 広告出現確率（割合）
let ads_p = 0.1;

// クエリパラメータにno-adsが含まれるとき、広告を無効にする
if (location.search.includes("no-ads")) {
    ads_p = 0;
}


// 広告抽選の周期[ms]
let ads_spantime = 15000;


// 広告リスト
adsList = [
    /* 見本
    {
        title: "",
        url: "",
        image: "",
        text: [""]
    },
    */
    {
        title: "今話題の健康サプリ！人生が変わる！",
        url: "https://www.kobayashi.co.jp/seihin/choleste/",
        image: "medicine.png",
        text: ["農林水産大臣賞受賞！健康サプリ！", "1か月で10kg以上痩せる！", "本気で変わりたいあなたへ！", "今だけなんと20%オフ！", "買うなら今！このチャンスを見逃すな！"]
    },
    {
        title: "立地良好！新築マンション！",
        url: "https://suumo.jp/chiba/",
        image: "house2.jpeg",
        text: ["駅徒歩3分！通勤通学に便利！", "乗り換えなし直通で都心まで45分！", "大型ショッピングモールまで車8分！", "バス・トイレ別！家族で住みやすい！", "セキュリティオートロック付で安心安全！"]
    },
    {
        title: "うちの研究室…一年半、大きな研究成果を出してません！",
        url: "https://ics-cit.jp/ics/facultymember/miura/",
        image: "miura_smile.jpg",
        text: ["うちの研究室…一年半、大きな研究成果を出してません！", "マコモ研究室って知ってますか？", "さらに、実験器具は3年間変えてません！", "なんと、PCはwindows7を使っています！"]
    },
    {
        title: "今話題の通信方式 \"吐息通信\"！",
        url: "https://ics-cit.jp/ics/facultymember/fujihara/",
        image: "fujihara_face.jpg",
        text: ["皆さんは \"吐息通信\" の存在を知っていますか？", "吐息を用いて行う通信について研究しています！", "吐息通信では、風エネルギーを電気エネルギーに変換する \"風電変換\" が重要です！", "高利得で吐息通信ができる世界を目指しています！"]
    },
    {
        title: "超高額報酬！簡単な計算をするだけ！",
        url: "https://ics-cit.jp/ics/facultymember/hirata/",
        image: "hirata_face.jpg",
        text: ["法律遵守！短期間で楽に稼げます！", "最大報酬100万！残り枠わずか！！", "仕事内容：与えられた方程式を解く", "勤務時間：最短3時間 上限なし", "備考：関数電卓の持ち込み不可"]
    }
]


// 広告に用いるHTML文
function adsHTML(title, url, image, text) {
    html = `
        <p class="ads-title">${title}</p>
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
    let num = Math.floor(Math.random() * adsList.length);
    num = 0; /* for debug */
    let ads = adsList[num];
    document.getElementById("random-ads").insertAdjacentHTML("beforeend", adsHTML(ads.title, ads.url, ads.image, ads.text));
    document.getElementById("ads").style.display = "flex";
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
