let newsForm = document.querySelector('.news-form'),
    newsBtn = document.querySelector('.news-btn'),
    newsMsg = document.querySelector('.news-msg'),
    newsInputs = document.querySelectorAll('.news-form input'),
    addnewsDiv = document.querySelector(".news .container");

newsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newsFormData = new FormData(newsForm);

    fetch(`https://u7428.xvest3.ru/sites/book/API/v1/index.php/addnews?unique_id=${unique_id}`, {
        method: "post",
        body: newsFormData
    })  
    .then((response) => response.json())  
    .then((data) => {
        if (data.ok === true && data.code === 200) {
            newsMsg.innerHTML = "<span style='color: green'>Yangilik qo'shildi</span>"
            news.innerHTML = "<h4>Yangiliklar</h4>";
            let a = 1;
            data.result.forEach((item) => {
                if (a == 1) {
                    addnewsDiv.innerHTML += `
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
                    addnewsDiv.innerHTML += `
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
            newsMsg.innerHTML = "<span style='color: crimson'>Nimadir xato ketdi! Birozdan so'ng urinib ko'ring.</span>"
        }
        setTimeout(() => {
            newsMsg.innerHTML = ""
        }, 2000);
        newsBtn.innerHTML = "Qo'shish"
        newsInputs.forEach((item) => {
            item.value = ""
        })
    })  
    .catch((error) => {  
        console.error(error);
    });

    newsBtn.innerHTML = "Loading..."
})