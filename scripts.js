let url = 'https://attendance.is.it-chiba.ac.jp/attendance/class_room/';


document.getElementById('copy-622').addEventListener('click', function () {
    navigator.clipboard.writeText(url + '622');
})

document.getElementById('copy-642').addEventListener('click', function () {
    navigator.clipboard.writeText(url + '642');
})


document.getElementById('input-jump').addEventListener('click', function () {
    let classNum = document.getElementById('class-num').value;
    window.open(url + classNum);
})

document.getElementById('copy-input-num').addEventListener('click', function () {
    let classNum = document.getElementById('class-num').value;
    navigator.clipboard.writeText(url + classNum);
})
