let news = document.querySelector(".news .container");

fetch(`https://u7428.xvest3.ru/sites/book/API/v1/index.php/getallnews`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        let a = 1;
        data.result.forEach((item) => {
            if (a == 1) {
                news.innerHTML += `
                <div class="news-card">
                    <div class="box">
                        <img src="https://u7428.xvest3.ru/sites/book/API/uploads/${item.img}" alt="">
                        <button class="btn btn-danger mt-2 news-delete" id="${item.id}">O'chirish</button>
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
                news.innerHTML += `
                <div class="news-card">
                    <div class="box">
                        <h6>${item.title}</h6>
                        <p>${item.description}</p>
                    </div>
                    <div class="box">
                        <img src="https://u7428.xvest3.ru/sites/book/API/uploads/${item.img}" alt="">
                        <button class="btn btn-danger mt-2 news-delete" id="${item.id}">O'chirish</button>
                    </div>
                </div>
                <hr>
                `
                a = 1;
            }
        });

        let newsDelBtns = document.querySelectorAll('.news-delete');

        newsDelBtns.forEach((item) => {
            item.addEventListener('click', () => {
                item.value = "Loading...";
                fetch(`https://u7428.xvest3.ru/sites/book/API/v1/index.php/delnews?unique_id=${unique_id}&news_id=${item.id}`, {
                    method: "post"
                })  
                .then((response) => response.json())  
                .then((data) => {
                    console.log(data)
                    if (data.ok === true && data.code === 200) {
                        news.innerHTML = "<h4>Yangiliklar</h4>";
                        let a = 1;
                        data.result.forEach((item) => {
                            if (a == 1) {
                                news.innerHTML += `
                                <div class="news-card">
                                    <div class="box">
                                        <img src="https://u7428.xvest3.ru/sites/book/API/uploads/${item.img}" alt="">
                                        <button class="btn btn-danger mt-2 news-delete" id="${item.id}">O'chirish</button>
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
                                news.innerHTML += `
                                <div class="news-card">
                                    <div class="box">
                                        <h6>${item.title}</h6>
                                        <p>${item.description}</p>
                                    </div>
                                    <div class="box">
                                        <img src="https://u7428.xvest3.ru/sites/book/API/uploads/${item.img}" alt="">
                                        <button class="btn btn-danger mt-2 news-delete" id="${item.id}">O'chirish</button>
                                    </div>
                                </div>
                                <hr>
                                `
                                a = 1;
                            }
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
