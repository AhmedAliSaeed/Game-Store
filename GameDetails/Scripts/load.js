var id = window.location.search.split('=')[1];
let loggedUsername = document.cookie;
let user;
let gameIds
if(loggedUsername){
    user = JSON.parse(localStorage.getItem('users')).filter(x => x.username === loggedUsername.split('=')[1])[0];
    gameIds = user.gamesOwned;
}

var img = document.querySelector('.main-image img');
var title = document.querySelector('.product-details h1');
var summary = document.querySelector('.product-details .product-description');
var totalReviews = document.querySelector('.rating span');
var price = document.querySelector('.current-price');
var btn = document.querySelector('.add-to-cart');

var description = document.querySelector('.game-info p');
var slider = document.querySelector('.games-slider'); 
var recommendation = document.querySelector('.game-cards');


let items = [];
let active = 0;

GetData();




function GetData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `../games.json`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.response;
            var parsed = JSON.parse(result);
            var game = parsed.filter(x => x.Id == id)[0];

            img.setAttribute('src', game.ImageUrl);
            title.textContent = game.Title;
            summary.textContent = game.Summary;
            totalReviews.textContent = `${game.Ratings} / 100`;
            price.textContent = `${game.Price}$`;
            description.textContent = game.Overview;

            game.IngameUrls.forEach(x => {
                 slider.innerHTML += `
                    <div class="item">
                        <img src="${x}">
                    </div>
                `;   
            });

            if(user && gameIds.includes(game.Id)){
                btn.style.pointerEvents = 'none';
                btn.innerHTML = `
                <i class="fa-solid fa-check"></i> Purchased
                `;
            }
            else if(user && user.cartItems.includes(game.Id)){
                btn.style.pointerEvents = 'none';
                btn.innerHTML = `
                <i class="fa-solid fa-check"></i> Added To Cart
                `;
            }           
            else{
                btn.innerHTML = `
                <i class="fas fa-shopping-cart"></i> Add to Cart
                `;
            }
            
            const allowed = [];
            for (let i = 1; i <= 16; i++) 
                if (Number(id) != i && (!user || !gameIds.includes(i))) 
                    allowed.push(i);
            
            // Shuffle the allowed array
            for (let i = allowed.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allowed[i], allowed[j]] = [allowed[j], allowed[i]];
            }
            const recommendedGames = allowed.slice(0, 3);
            
            recommendedGames.forEach(x => { 
                let currentGame = parsed.filter(y => y.Id == x)[0];
                recommendation.innerHTML += `
                    <div class="game-card">
                        <img src="${currentGame.ImageUrl}" alt="Game 1">
                        <h4>${currentGame.Title}</h4>
                        <p>$${currentGame.Price}</p>
                        <button class="show-more" onclick="window.location.href = '../GameDetails/gameDetails.html?id=${currentGame.Id}'">
                            <a>Show More</a>
                        </button>
                    </div>
                    `;
            });

            items = document.querySelectorAll('.games-slider .item');
            loadShow();
        }
    }
    xhr.send();
}



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

function Next() {
    active = active + 1 < items.length ? active + 1 : 0;
    loadShow();
}
 function Prev() {
    active = active - 1 >= 0 ? active - 1 : items.length - 1;
    loadShow();
}

function AddToCart(){

    if(!user){
        window.location.href = '../Login/Login.html';
    }
    var users = JSON.parse(localStorage.getItem('users'));
    user = users.filter(x => x.username === loggedUsername.split('=')[1])[0];
    user.cartItems.push(Number(id));
    localStorage.setItem('users',JSON.stringify(users));
    btn.style.pointerEvents = 'none';
    btn.innerHTML = `
    <i class="fa-solid fa-check"></i> Added To Cart
    `;
}