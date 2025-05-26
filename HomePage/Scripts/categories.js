let categories = document.querySelectorAll('.category-card');
let position = 0;
categories.forEach((x) => {
    x.style.transform = `rotateY( calc(${position} * (360  / ${categories.length}) * 1deg)) rotateX(-5deg) translateZ(500px)`;
    position++;
});


let cNext = document.getElementById('c-next');
let cPrev = document.getElementById('c-prev');

cNext.addEventListener('click', () => {
    categories.forEach((x) => {
        let deg = x.style.transform.split(' ')[0];
        let rotation = parseFloat(deg.substring(deg.lastIndexOf('(') + 1 ,deg.indexOf(')') - 3));
        console.log(rotation);
        
        x.style.transform = `rotateY(calc(${rotation + 51.45}deg)) rotateX(-5deg) translateZ(500px)`;
    });
});

cPrev.addEventListener('click', () => {
    categories.forEach((x) => {
        let deg = x.style.transform.split(' ')[0];
        let rotation = parseFloat(deg.substring(deg.lastIndexOf('(') + 1 ,deg.indexOf(')') - 3));
        console.log(rotation);
        
        x.style.transform = `rotateY(calc(${rotation - 51.45}deg)) rotateX(-5deg) translateZ(500px)`;
    });
});