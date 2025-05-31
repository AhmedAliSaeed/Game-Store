let slider = document.querySelector('.games-slider');
let background = document.getElementById('background');
let overlay = document.querySelector('.overlay');
let audio = document.querySelector('audio');
let loggedUsername = document.cookie.split('=')[1];
let user = JSON.parse(localStorage.getItem('users')).filter(x => x.username === loggedUsername)[0];
let gameIds = user.gamesOwned;
let allGames;
let filtered;

let items = [];
let active = 0;
let timeout;

audio.volume = 0.45;

GetData();


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


function GetData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `../games.json`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.response;
            allGames = JSON.parse(result);
            filtered = allGames.filter(x => gameIds.includes(x.Id));
            
            filtered.forEach(x => {
                slider.innerHTML += `
                    <div class="item" onclick='StartGame()'>
                        <img src="${x.ImageUrl}">
                        <h2>${x.Title}</h2>
                        <i class="fa-solid fa-play"></i>
                    </div>            `
            });

            items = document.querySelectorAll('.games-slider .item');
            audio.setAttribute('src', filtered[0].AudioUrl);
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

                        items.forEach((x,i) => {
                            if(i != active)
                                x.style.opacity = 0;
                        })

                        audio.currentTime = 0;
                        audio.muted = false;
                        audio.play()
                    },600)
                })    
            })
            
            images.forEach(x => {
                x.addEventListener('mouseleave',()=>{

                    items.forEach((x,i) => {
                        if(i != active && Math.abs(i-active) < 4)
                            x.style.opacity = 0.6;
                    })
                    clearTimeout(timeout);
                    overlay.style.display = 'none';
                    background.style.background = 'none';
                    background.style.animation = 'none';   
                    background.offsetHeight;                   
                    background.style.animation = '';
                    audio.pause();    
                })    
            })
            loadShow();

        }
    }
    xhr.send();
}


function slideR(){
    active = active + 1 < items.length ? active + 1 : active;
    audio.setAttribute('src', filtered[active].AudioUrl);
    audio.pause();
    loadShow();
};

function SlideL() {
    active = active - 1 >= 0 ? active - 1 : active;
    audio.setAttribute('src', filtered[active].AudioUrl)
    audio.pause();
    loadShow();
}

function StartGame(){
    var loadpop = document.querySelector('.launch-screen');
    var progress = document.querySelector('.launch-screen progress');
    var img = document.querySelector('.launch-info img');
    var title = document.querySelector('.launch-game');

    img.setAttribute('src',filtered[active].ImageUrl);
    title.textContent = filtered[active].Title;
    loadpop.style.display = 'flex';
    let interval = setInterval(()=>{
        progress.value += 1;
        if(progress.value == 100){
            clearInterval(interval);
            loadpop.style.display = 'none';
            progress.value = 0;
        }
    },15);
}