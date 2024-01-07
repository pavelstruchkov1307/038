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
    if (e.target === modal) {
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

    constructor(src, alt, title, desc, price, selector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.selector = selector;
        this.classes = classes;
    }

    createMenu() {

        const div = document.createElement("div");

        if (this.classes.length) {
            this.classes.forEach(className => div.classList.add(className)); 
        } else {
            div.classList.add("menu__item")
        }

        div.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

        const element = document.querySelector(this.selector);
        element.append(div);

    }
    
}

new Menu("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"',  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и      здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', "229", ".menu .container", "menu__item", "last").createMenu();

// forms
const forms = document.querySelectorAll('form');

const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы свами свяжемся',
    error: "Что-то пошло не так"
};

forms.forEach((e) => {
    postData(e);
});

function postData(form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const div = document.createElement("div");
        div.classList.add("status");
        div.textContent = message.loading;
        form.append(div);

        const formData = new FormData(form);

        const obj = {};

        formData.forEach((val, key) => {
            obj[key] = val;
        });

        const json = JSON.stringify(obj);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../server.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);

        xhr.addEventListener("load", (e) => {
            if (xhr.status === 200 ) {
                showThanksModal(message.success);
                div.remove();
                form.reset();
            }else {
                showThanksModal(message.error);
                div.remove();
                form.reset();
            }
        });

        function showThanksModal(message) {
            const prevModal = document.querySelector(".modal__dialog");
            prevModal.style.display = "none";

            const div = document.createElement("div");
            div.classList.add("modal__dialog");
            openModal();

            div.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector(".modal").append(div);

            setTimeout(() => {
                div.remove();
                prevModal.style.display = "block";
                hideModal();
            }, 4000);

        }

    });

}

fetch("../db.json")
.then(data => data.json())
.then(res => console.log(res));