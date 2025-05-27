let items = document.querySelectorAll('.games-slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0;
function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    items[active].lastElementChild.style.opacity = 1;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 3 ? 0 : 0.6;
        items[i].lastElementChild.style.opacity = 0;
    }
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 3 ? 0 : 0.6;
        items[i].lastElementChild.style.opacity = 0;
    }
}
loadShow();
next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

let images = document.querySelectorAll('.games-slider .item img');
let background = document.getElementById('background');
let overlay = document.querySelector('.overlay');
let timeout;
images.forEach(x => {
    x.addEventListener('mouseenter',()=>{
        var img = x.getAttribute('src');
        img = img.replace('GameCovers','GameWallpapers');
        console.log(img);
        timeout = setTimeout(()=> {
            overlay.style.display = 'block';
            overlay.style.animationPlayState = 'running';
            background.style.background = `url(${img})`;
            background.style.backgroundSize = 'cover';
        },1200)
        
    })    
})
   
images.forEach(x => {
    x.addEventListener('mouseleave',()=>{
        clearTimeout(timeout);
        overlay.style.display = 'none';
        background.style.background = 'none';
        background.style.animation = 'none';   
        background.offsetHeight;                   
        background.style.animation = '';    
    })    
})
