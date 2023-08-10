let lastBooksDiv = document.querySelector(".all-books .container");
fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getbook`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        data.result.forEach((item) => {
            lastBooksDiv.innerHTML += `
                <div class="book-card">
                    <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.img}" alt="${item.author} - ${item.name}">
                    <h6 class="book-title">${item.name}</h6>
                    <h6 class="book-author">${item.author}</h6>
                    <a href="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.book}" download><button class="btn" id="${item.id}">Yuklab olish</button></a>
                </div>
            `
        });
    }else{
    }
})  
.catch((error) => {  
    console.error(error);
});


let newsUserDiv = document.querySelector(".news .container");
fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getallnews`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        let a = 1;
        data.result.forEach((item) => {
            if (a == 1) {
                newsUserDiv.innerHTML += `
                <div class="news-card">
                    <div class="box">
                        <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.img}" alt="">
                    </div>
                    <div class="box">
                        <h6>${item.title}</h6>
                        <p>${item.description}</p>
                    </div>
                </div>
                <hr>
                `
                a = 2;
            }else if (a == 2){
                newsUserDiv.innerHTML += `
                <div class="news-card">
                    <div class="box">
                        <h6>${item.title}</h6>
                        <p>${item.description}</p>
                    </div>
                    <div class="box">
                        <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${item.img}" alt="">
                    </div>
                </div>
                <hr>
                `
                a = 1;
            }
        });
    }else{
    }
})  
.catch((error) => {  
    console.error(error);
});


let categoryDiv = document.querySelector(".cotegory-div");
fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getallcategory`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        data.result.forEach((item) => {
            categoryDiv.innerHTML += `
                <button id="${item.id}" class="change-category">${item.name}</button>
            `
        });
        let changeCategory = document.querySelectorAll('.change-category');
        changeCategory.forEach((item) => {
            item.addEventListener('click', () => {
                document.querySelector(".all-books h3").innerHTML = item.innerHTML;
                lastBooksDiv.innerHTML = "";
                cotegoryModal.classList.remove("active");
                fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getbook?category_id=${item.id}`, {
                    method: "post"
                })  
                .then((response) => response.json())  
                .then((data) => {
                    if (data.ok === true && data.code === 200) {
                        // lastBooksDiv.innerHTML = `<h3>${item.value}</h3>`
                        data.result.forEach((bookItem) => {
                            lastBooksDiv.innerHTML += `
                                <div class="book-card">
                                    <img src="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${bookItem.img}" alt="${bookItem.author} - ${bookItem.name}">
                                    <h6 class="book-title">${bookItem.name}</h6>
                                    <h6 class="book-author">${bookItem.author}</h6>
                                    <a href="https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/uploads/${bookItem.book}" download><button class="btn" id="${bookItem.id}">Yuklab olish</button></a>
                                </div>
                            `
                        });
                    }else{
                    }
                })  
                .catch((error) => {  
                    console.error(error);
                });
            })
        })
    }else{
    }
})  
.catch((error) => {  
    console.error(error);
});