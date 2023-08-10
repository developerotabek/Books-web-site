let bookDiv = document.querySelector(".all-books .container");

fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getbook`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        let a = 1;
        data.result.forEach((item) => {
            bookDiv.innerHTML += `
                <div class="book-card">
                    <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.img}" alt="">
                    <h6 class="book-title">${item.name}</h6>
                    <h6 class="book-author">${item.author}</h6>
                    <button class="btn btn-danger book-delete" id="${item.id}">O'chirish</button>
                </div>
            `
        });

        let bookDelBtn = document.querySelectorAll('.book-delete');

        bookDelBtn.forEach((item) => {
            item.addEventListener('click', () => {
                console.log(1);
                item.value = "Loading...";
                fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/delbook?unique_id=${unique_id}&book_id=${item.id}`, {
                    method: "post"
                })  
                .then((response) => response.json())  
                .then((data) => {
                    console.log(data)
                    if (data.ok === true && data.code === 200) {
                        bookDiv.innerHTML = "";
                        let a = 1;
                        data.result.forEach((item) => {
                            bookDiv.innerHTML += `
                                <div class="book-card">
                                    <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/book/API/uploads/${item.img}" alt="">
                                    <h6 class="book-title">${item.name}</h6>
                                    <h6 class="book-author">${item.author}</h6>
                                    <button class="btn btn-danger book-delete" id="${item.id}">O'chirish</button>
                                </div>
                            `
                        });
                    }else{
                    }
                    item.value = "O'chirish";
                })  
                .catch((error) => {  
                    console.error(error);
                });
            })
        });

    }else{
    }
})  
.catch((error) => {  
    console.error(error);
});
