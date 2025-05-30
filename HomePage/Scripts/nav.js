var nav = document.getElementsByTagName('nav')[0];
var username = document.cookie.split('=')[1];

if(!username){
    nav.innerHTML= `
        <p><a href="../Games/Games.html">Browse Games</a></p>
        <p><a href="../Login/login.html">Login</a></p>
        <p><a href="../Register/Register.html">Register</a></p>
    `;
}
else{
    nav.innerHTML= `
        <p><a href="../Games/Games.html">Browse Games</a></p>
        <p><a href="../GameLibrary/GameLibrary.html">Library</a></p>
        <p><a href="#">Cart</a></p>
        <p><a onclick='Logout()'>Logout</a></p>
    `;
}

function Logout(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = '../HomePage/index.html';
}
//        <p> Welcome <span style='color:red;'>${username}</span></p>

var logo = document.querySelector('header .logo');
logo.addEventListener('click',()=>{
    window.location.href = '../HomePage/index.html';
})