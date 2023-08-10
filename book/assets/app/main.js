let openCotegory = document.querySelectorAll(".open-cotegory"),
    cotegoryModal = document.querySelector(".cotegory-modal"),
    closeCotegory = document.querySelector(".close-cotegory"),
    openMenu = document.querySelector(".open-menu"),
    closeMenu = document.querySelector(".close-menu"),
    multiMenu = document.querySelector(".multi-menu"),
    headerContact = document.querySelectorAll(".header-contact"),
    contactModal = document.querySelector(".contact-modal"),
    closeContact = document.querySelector(".close-contact");
    

openCotegory.forEach(item => {
    item.addEventListener('click', () => {
        cotegoryModal.classList.toggle("active");
    });
});
// closeCotegory.addEventListener('click', () => {
//     cotegoryModal.classList.remove("active");
// });


openMenu.addEventListener('click', () => {
    multiMenu.classList.toggle("active");
});
closeMenu.addEventListener('click', () => {
    multiMenu.classList.remove("active");
});


headerContact.forEach(item => {
    item.addEventListener('click', () => {
        contactModal.classList.toggle("active");
    });
});
closeContact.addEventListener('click', () => {
    contactModal.classList.remove("active");
});