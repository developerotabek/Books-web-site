let loginForm = document.querySelector('.login-form'),
    loginBtn = document.querySelector('.login-btn'),
    loginMsg = document.querySelector('.login-msg');


loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const loginFormData = new FormData(loginForm);

    fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/adminlogin`, {
        method: "post",
        body: loginFormData
    })  
    .then((response) => response.json())  
    .then((data) => {
        if (data.ok === true && data.code === 200) {
            window.location.href = "../";
            localStorage.setItem("7bka7d8m0i8n", data.result['unique_id'])
            setTimeout(() => {
                loginMsg.innerHTML = ""
            }, 2000);
        }else{
            loginMsg.innerHTML = "<span style='color: crimson'>Login or password is invalid!</span>"
        }
        loginBtn.innerHTML = "Go"
    })  
    .catch((error) => {  
        console.error(error);
    });

    loginBtn.innerHTML = "Loading..."
})