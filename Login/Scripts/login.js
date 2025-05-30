function login() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const remember = document.getElementById('remember');
    const customAlert = document.getElementById('customAlert');
    const closeAlert = document.getElementById('closeAlert');
    const alertOk = document.getElementById('alertOk');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');

    // فحص وجود العناصر
    if (!username || !password || !remember || !customAlert || !closeAlert || !alertOk || !alertTitle || !alertMessage) {
        console.error('One or more DOM elements not found');
        return;
    }

    // فحص إن الخانات فاضية
    if (!username.value.trim() || !password.value.trim()) {
        alertTitle.textContent = 'Error';
        alertMessage.textContent = 'Please fill out all fields';
        customAlert.classList.add('show');
        return;
    }

    // جلب المستخدمين
    const users = getUsers();
    const isValid = users.some(x => x.username === username.value && x.password === password.value);

    if (isValid) {
        if (remember.checked) {
            const date = new Date();
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = `username=${username.value}; path=/; ${expires};`;
        }   
        else
        {
            document.cookie = `username=${username.value}; path=/;`;
        }
        window.location.href = '../HomePage/index.html';
    } else {
        alertTitle.textContent = 'Login Failed!';
        alertMessage.textContent = 'Incorrect username or password. Please try again.';
        customAlert.classList.add('show');
    }

    function closeCustomAlert() {
        customAlert.classList.remove('show');
    }

    closeAlert.replaceWith(closeAlert.cloneNode(true));
    alertOk.replaceWith(alertOk.cloneNode(true));

    document.getElementById('closeAlert').addEventListener('click', closeCustomAlert);
    document.getElementById('alertOk').addEventListener('click', closeCustomAlert);

    customAlert.addEventListener('click', function(e) {
        if (e.target === customAlert) {
            closeCustomAlert();
        }
    });
}

function getUsers() {
    const usersJson = localStorage.getItem("users");
    return usersJson ? JSON.parse(usersJson) : [];
}