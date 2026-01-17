function noscroll(e){
    e.preventDefault();
}


// スクロール有効化
function scroll_able() {
    document.querySelectorAll("body")[0].classList.remove('no_scroll');
    document.querySelectorAll("html")[0].classList.remove('no_scroll');
    // document.removeEventListener('touchmove', noscroll);
    // document.removeEventListener('wheel', noscroll);
}


// スクロール無効化
function scroll_disable() {
    document.querySelectorAll("body")[0].classList.add('no_scroll');
    document.querySelectorAll("html")[0].classList.add('no_scroll');
    // document.addEventListener('touchmove', noscroll, {passive: false});
    // document.addEventListener('wheel', noscroll, {passive: false});
}