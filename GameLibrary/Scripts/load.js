let slider = document.querySelector('.games-slider');
let background = document.getElementById('background');
let overlay = document.querySelector('.overlay');
let loggedUsername = document.cookie.split('=')[1];
let user = JSON.parse(localStorage.getItem('users')).filter(x => x.username === loggedUsername)[0];
let gameIds = user.gamesOwned;


let items = [];
let active = 0;
let timeout;

GetData();


function loadShow() {
    console.log(items);

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


function GetData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `../games.json`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.response;
            var parsed = JSON.parse(result);
            var filtered = parsed.filter(x => gameIds.includes(x.Id));
            
            filtered.forEach(x => {
                slider.innerHTML += `
                    <div class="item">
                        <img src="${x.ImageUrl}">
                        <h2>${x.Title}</h2>
                    </div>            `
            });

            items = document.querySelectorAll('.games-slider .item');

            let images = document.querySelectorAll('.games-slider .item img');
            images.forEach(x => {
                x.addEventListener('mouseenter',()=>{
                    var img = x.getAttribute('src');
                    img = img.replace('GameCovers','GameWallpapers');
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
            loadShow();

        }
    }
    xhr.send();
}


function slideR(){
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
};

function SlideL() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}
