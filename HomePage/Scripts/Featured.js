let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    setTimeout(() => items[1].style.backgroundImage = items[1].style.backgroundImage.replace('GameWallpapers', 'GameCovers')
    ,300);
    items[2].style.backgroundImage = items[2].style.backgroundImage.replace('GameCovers', 'GameWallpapers');
    document.querySelector('.slide').appendChild(items[0]);
})

prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    setTimeout(()=>items[1].style.backgroundImage = items[1].style.backgroundImage.replace('GameWallpapers', 'GameCovers'),200);
    items[0].style.backgroundImage = items[0].style.backgroundImage.replace('GameCovers', 'GameWallpapers');
    document.querySelector('.slide').prepend(items[items.length - 1]);
})