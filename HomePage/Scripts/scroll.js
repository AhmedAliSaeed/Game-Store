const animated = document.getElementById('scrollAnimation');
const btn = document.querySelector('.s-image-box button');

animated.addEventListener('animationend', () => {
    const computed = getComputedStyle(animated).width;
    console.log(computed)
    if(computed === '1512.8px')
        btn.style.animationPlayState = 'running';
    else{
        btn.style.animation = 'none';       
        btn.offsetHeight;                   
        btn.style.animation = '';
    }
        
});