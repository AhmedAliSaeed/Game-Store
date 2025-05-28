let items = document.querySelectorAll('.games-slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0;
function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${100 * stt}%)`;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-100 * stt}%)`;
    }
}
loadShow();
next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : 0;
    loadShow();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : items.length - 1;
    loadShow();
}