let editForm = document.querySelector('.edit-form'),
    editBtn = document.querySelector('.edit-btn'),
    editMsg = document.querySelector('.edit-msg'),
    editInputs = document.querySelectorAll('.edit-form input');

editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const editFormData = new FormData(editForm);

    fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/admineditprofile?unique_id=${unique_id}`, {
        method: "post",
        body: editFormData
    })  
    .then((response) => response.json())  
    .then((data) => {
        if (data.ok === true && data.code === 200) {
            editMsg.innerHTML = "<span style='color: green'>Ma'lumotlar o'zgartirildi.</span>"
        }else{
            editMsg.innerHTML = "<span style='color: crimson'>Nimadir xato ketdi! Birozdan so'ng urinib ko'ring.</span>"
        }
        setTimeout(() => {
            editMsg.innerHTML = ""
        }, 2000);
        editBtn.innerHTML = "O'zgartirish"
        editInputs.forEach((item) => {
            item.value = ""
        })
    })  
    .catch((error) => {  
        console.error(error);
    });

    editBtn.innerHTML = "Loading..."
})