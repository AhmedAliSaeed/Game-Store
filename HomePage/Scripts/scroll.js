const animated = document.getElementById('scrollAnimation');
const btn = document.querySelector('.s-image-box button');

const initialWidth = getComputedStyle(animated).width;
animated.addEventListener('animationend', () => {
    const computed = getComputedStyle(animated).width;
    if(computed !== initialWidth)
        btn.style.animationPlayState = 'running';
    else{
        btn.style.animation = 'none';       
        btn.offsetHeight;                   
        btn.style.animation = '';
    }
        
});