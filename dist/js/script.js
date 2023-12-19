//tabs
const tabs = document.querySelectorAll(".tabheader__item"),
      tabsParent = document.querySelector(".tabheader__items"),
      tabContent = document.querySelectorAll(".tabcontent");

function hideTabContext() {

    tabContent.forEach(item => {
        item.style.display = "none";
    });

    tabs.forEach(item => {
        item.classList.remove("tabheader__item_active");
    });
    
}

function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabContent[i].classList.add("tabheader__item_active");
}

tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
            if (target == item) {

                hideTabContext();
                showTabContent(i);

            }
        });
    }
});

hideTabContext();
showTabContent();

//timer

const endTime = "2023-12-31";

function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds");

    const timerId = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {

        const t = getDateDifference(endTime);

        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;

    }
}

function getDateDifference(endTime) {
    const diff = Date.parse(endTime) - Date.parse(new Date()),
          days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30),
          hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes = Math.floor((diff / (1000 * 60)) % 60),
          seconds = Math.floor((diff / 1000) % 60);

    return {
        total: diff,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
   
}

setClock(".timer",endTime);


// Modal
// const openModal = document.querySelectorAll("[data-modal]");
const closeModal = document.querySelector("[data-close]");
const modal = document.querySelector(".modal");

function hideModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
        openModal();
        clearTimeout(modalTimeout);
    });
});

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
    if (e.target = modal) {
        hideModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        hideModal();
    }
});

const modalTimeout  = setTimeout(openModal, 6000);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

// Class
class Menu {

    constructor(src, alt, title, desc, price, selector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.selector = selector;
    }

    createMenu() {

        const div = document.createElement("div");

        div.innerHTML = `<div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        </div>`;

        const element = document.querySelector(this.selector);
        console.log(element)
        console.log(div)
        element.append(div);

    }
    
}

new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"',  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и      здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', "229", ".menu .container").createMenu();