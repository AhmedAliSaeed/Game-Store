var nav = document.getElementsByTagName('nav')[0];
var username = document.cookie.split('=')[1];

if(!username){
    nav.innerHTML= `
        <p><i class="fa-solid fa-gamepad"></i><a href="../Games/Games.html">Browse Games</a></p>
        <p><i class="fa-solid fa-right-to-bracket"></i><a href="../Login/login.html">Login</a></p>
        <p><i class="fa-solid fa-user-plus"></i><a href="../Register/Register.html">Register</a></p>
    `;
}
else{
    nav.innerHTML= `
        <p><i class="fa-solid fa-gamepad"></i><a href="../Games/Games.html">Browse Games</a></p>
        <p><i class="fa-solid fa-desktop"></i><a href="../GameLibrary/GameLibrary.html">Library</a></p>
        <p><i class="fa-solid fa-cart-shopping"></i><a href="#">Cart</a></p>
        <p><i class="fa-solid fa-right-to-bracket"></i><a onclick='Logout()'>Logout</a></p>
    `;
}

function Logout(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = '../HomePage/index.html';
}

var logo = document.querySelector('header .logo');
logo.addEventListener('click',()=>{
    window.location.href = '../HomePage/index.html';
})