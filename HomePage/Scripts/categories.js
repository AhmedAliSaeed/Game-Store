let categories = document.querySelectorAll('.category-card');
let position = 0;
categories.forEach((x) => {
    x.style.transform = `rotateY( calc(${position} * (360  / ${categories.length}) * 1deg))  translateZ(500px)`;
    position++;
});


let cNext = document.getElementById('c-next');
let cPrev = document.getElementById('c-prev');

cNext.addEventListener('click', () => {
    categories.forEach((x) => {
        let deg = x.style.transform.split(' ')[0];
        let rotation = parseFloat(deg.substring(deg.lastIndexOf('(') + 1 ,deg.indexOf(')') - 3));
        console.log(rotation);
        
        x.style.transform = `rotateY(calc(${rotation + 51.45}deg)) translateZ(500px)`;
    });
});

cPrev.addEventListener('click', () => {
    categories.forEach((x) => {
        let deg = x.style.transform.split(' ')[0];
        let rotation = parseFloat(deg.substring(deg.lastIndexOf('(') + 1 ,deg.indexOf(')') - 3));
        console.log(rotation);
        
        x.style.transform = `rotateY(calc(${rotation - 51.45}deg))  translateZ(500px)`;
    });
});

// Genres

document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) {
                window.location.href = `../../Games/Games.html?category=${encodeURIComponent(category)}`;
            }
        });
    });

    // Slider Navigation
    const slider = document.querySelector('.category-slider');
    const prevBtn = document.getElementById('c-prev');
    const nextBtn = document.getElementById('c-next');

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -200, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});