let categoryForm = document.querySelector('.category-form'),
    categoryBtn = document.querySelector('.category-btn'),
    categoryMsg = document.querySelector('.category-msg'),
    categoryInputs = document.querySelectorAll('.category-form input');

categoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const categoryFormData = new FormData(categoryForm);

    fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/addcategory?unique_id=${unique_id}`, {
        method: "post",
        body: categoryFormData
    })  
    .then((response) => response.json())  
    .then((data) => {
        if (data.ok === true && data.code === 200) {
            categoryMsg.innerHTML = "<span style='color: green'>Katalog qo'shildi</span>"
            categories.innerHTML = ""
            data.result.forEach((item) => {
            categories.innerHTML += `
                <option value='${item.id}'>${item.name}</option>
            `
        });
        }else{
            categoryMsg.innerHTML = "<span style='color: crimson'>Nimadir xato ketdi! Birozdan so'ng urinib ko'ring.</span>"
        }
        setTimeout(() => {
            categoryMsg.innerHTML = ""
        }, 2000);
        categoryBtn.innerHTML = "Qo'shish"
        categoryInputs.forEach((item) => {
            item.value = ""
        })
    })  
    .catch((error) => {  
        console.error(error);
    });

    categoryBtn.innerHTML = "Loading..."
})