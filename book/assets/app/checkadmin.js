let unique_id = localStorage.getItem("7bka7d8m0i8n") ? localStorage.getItem("7bka7d8m0i8n") : 'undefined',
    categories = document.querySelector('.categories');

fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/checkadmin?unique_id=${unique_id}`, {
    method: "post"
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        
    }else{
        window.location.href = "../../";
    }
})  
.catch((error) => {  
    console.error(error);
});

fetch(`https://u10222.xvest1.ru/sites/oltinsoyakm.uz/API/v1/index.php/getallcategory`, {
    method: "post" 
})  
.then((response) => response.json())  
.then((data) => {
    if (data.ok === true && data.code === 200) {
        data.result.forEach((item) => {
            categories.innerHTML += `
                <option value='${item.id}'>${item.name}</option>
            `;
        });
    }else{
    }
})  
.catch((error) => {  
    console.error(error);
});

