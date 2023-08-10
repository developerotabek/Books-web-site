let sideBarMenu = document.querySelector('.sideBars'),
    tabs = document.querySelector('.tab'),
    tablinks = document.querySelectorAll('.tablinks');

    
sideBarMenu.addEventListener('click', () => {
    tabs.classList.add('active');
});

tablinks.forEach((item) => {
    item.addEventListener('click', () => {
        tabs.classList.remove('active');
    });
});

document.querySelector('.defaultTab').click();

function openPage(evt, pageName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}