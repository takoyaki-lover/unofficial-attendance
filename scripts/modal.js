// alert
function alertOpen(alertText) {
    document.getElementById("alert").style.display = "block";
    document.getElementById("alert-text").textContent = alertText;
    scroll_disable();
};

function alertClose() {
    document.getElementById("alert").style.display = "none";
    document.getElementById("alert-text").textContent = "";
    scroll_able();
};

document.getElementById("alert-x").addEventListener("click", alertClose);
document.getElementById("alert-ok").addEventListener("click", alertClose);


// confirm
let id;
function confirmOpen(confirmText, identification) {
    document.getElementById("confirm").style.display = "block";
    document.getElementById("confirm-text").textContent = confirmText;
    id = identification;
    scroll_disable();
};

function confirmClose() {
    document.getElementById("confirm").style.display = "none";
    document.getElementById("confirm-text").textContent = "";
    scroll_able();
};

document.getElementById("confirm-x").addEventListener("click", confirmClose)
document.getElementById("confirm-no").addEventListener("click", confirmClose)

document.getElementById("confirm-yes").addEventListener("click", function () {
    confirmClose();
    if (id[0] == "delete-all") {
        let classlist = JSON.parse(localStorage.classlist);
        let descriptionlist = JSON.parse(localStorage.descriptionlist);
        let length = classlist.length;
        for (i = 0; i < length; i++) {
            classlist.pop();
            descriptionlist.pop();
        }
        localStorage.classlist = JSON.stringify(classlist);
        localStorage.descriptionlist = JSON.stringify(descriptionlist);
        location.reload();
    } else if (id[0] == "delete") {
        deleteRoom(id[1]);
    }
});
