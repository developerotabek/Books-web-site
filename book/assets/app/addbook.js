let bookForm = document.querySelector('.book-form'),
    bookBtn = document.querySelector('.book-btn'),
    bookMsg = document.querySelector('.book-msg'),
    bookInputs = document.querySelectorAll('.book-form input');

bookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const bookFormData = new FormData(bookForm);

    fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/addbook?unique_id=${unique_id}`, {
        method: "post",
        body: bookFormData
    })  
    .then((response) => response.json())  
    .then((data) => {
        console.log(data);
        if (data.ok === true && data.code === 200) {
            bookMsg.innerHTML = "<span style='color: green'>Kitob qo'shildi</span>"
            bookDiv.innerHTML = ""
            data.result.forEach((item) => {
                bookDiv.innerHTML += `
                    <div class="book-card">
                        <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.img}" alt="">
                        <h6 class="book-title">${item.name}</h6>
                        <h6 class="book-author">${item.author}</h6>
                        <button class="btn btn-danger" id="${item.id}">O'chirish</button>
                    </div>
                `   
            })
        }else{
            bookMsg.innerHTML = "<span style='color: crimson'>Nimadir xato ketdi! Birozdan so'ng urinib ko'ring.</span>"
        }
        setTimeout(() => {
            bookMsg.innerHTML = ""
        }, 2000);
        bookBtn.innerHTML = "Qo'shish"
        bookInputs.forEach((item) => {
            item.value = ""
        })
    })  
    // .catch((error) => {  
    //     console.error(error);
    // });

    bookBtn.innerHTML = "Loading..."
})