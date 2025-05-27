var username = document.getElementsByName('username')[0];
var password = document.getElementsByName('password')[0];
var remember = document.getElementsByName('remember')[0];

function login(){
    var users = getUsers();
    var isValid = users.some(x => x.username === username.value && x.password === password.value);
    if(isValid){
        if(remember.checked){
            const date = new Date();
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = `username=${username.value}; ${expires};`;
        }   
        else
        {
            document.cookie = `username=${username.value}`;
        }
    }
    else
        alert('login Failed')
}

function getUsers() {
  const usersJson = localStorage.getItem("users");
  return usersJson ? JSON.parse(usersJson) : [];
}