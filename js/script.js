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

const getResource = async (url) => {
    const req = await fetch(url);

    if (!req.ok) {
        throw new Error("Network response was not OK");
    }

    return await req.json();
};

getResource("http://localhost:3000/menu")
.then((data) => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new Menu(img, altimg, title, descr, price, ".menu__item", [".menu", ".container"]).createMenu();
    });
});

//forms
const forms = document.querySelectorAll('form');

const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы свами свяжемся',
    error: "Что-то пошло не так"
};

forms.forEach((e) => {
    bindPostData(e);
});

const postData = async (url, data) => {
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });

    return await req.JSON();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()))

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.error);
        }).finally(() => {
            form.reset();
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

//slider
const offerSlides = document.querySelectorAll(".offer__slide");
const prevSlideBtn = document.querySelector(".offer__slider-prev");
const nextSlideBtn = document.querySelector(".offer__slider-next");
const currentNumber = document.querySelector("#current");
const totalCounter = document.querySelector("#total");
const sliderQuantity = offerSlides.length;
const slidesWrap = document.querySelector(".offer__slider-wrapper");
const slidesField = document.querySelector(".offer__slider-inner");
const width = window.getComputedStyle(slidesWrap).width;

let slideIndex = 1;
let offSet = 0;

slidesField.style.width = 100 * offerSlides.length + '%';
slidesField.style.display = 'flex';

slidesWrap.style.overflow = 'hidden';

currentNumber.textContent = (slideIndex < 10) ? ('0' + slideIndex) : slideIndex;

offerSlides.forEach(slide => {
    slide.style.width = width;
});

nextSlideBtn.addEventListener(('click'), () => {

    if (offSet == parseInt(width) * (offerSlides.length - 1)) {
        offSet = 0;
    } else {
        offSet += parseInt(width);
    }

    slidesField.style.transform = `translateX(-${offSet}px)`;

    if (slideIndex == sliderQuantity) {
        slideIndex = 1;
    } else  {
        slideIndex += 1;
    }

    currentNumber.textContent = (slideIndex < 10) ? ('0' + slideIndex) : slideIndex;

});

prevSlideBtn.addEventListener(('click'), () => {

    if (offSet == 0) {
        offSet = parseInt(width) * (offerSlides.length - 1);
    } else {
        offSet -= parseInt(width);
    }

    slidesField.style.transform = `translateX(-${offSet}px)`;


    if (slideIndex == 1) {
        slideIndex = sliderQuantity;
    } else  {
        slideIndex -= 1;
    }

    currentNumber.textContent = (slideIndex < 10) ? ('0' + slideIndex) : slideIndex;


});




// // dots slider
// const dots = document.querySelector(".dots");
// let allDots = [];

// // Creates dots and add listeners to them
// for (let i = 0; i < offerSlides.length; ++i) {
//     const dot = document.createElement("div");
//     dot.classList.add("dot");
//     dots.appendChild(dot);
//     allDots.push(dot);
//     dot.addEventListener("click", (e) => {
//         allDots.forEach((dot, i) => {
//             if (dot == e.target) {
//                 changeSlide(i + 1);
//             }
//         });
//     });
// }

// let slideIndex = 1;

// totalCounter.textContent = (sliderQuantity < 10) ? ('0' + sliderQuantity) : sliderQuantity;

// changeSlide(slideIndex);
// activateDot(slideIndex);

// prevSlideBtn.addEventListener("click", () => {
//     changeSlide(slideIndex - 1);
// });

// nextSlideBtn.addEventListener("click", () => {
//     changeSlide(slideIndex + 1);
// });

// function changeSlide(index) {

//     if (index > sliderQuantity) {
//         index = 1;
//     }

//     if (index < 1) {
//         index = sliderQuantity;
//     }

//     currentNumber.textContent = (index < 10) ? ('0' + index) : index;

//     offerSlides.forEach((slide, i) => {

//         if (i == index - 1) {
//             slide.classList.add("show");
//             slide.classList.remove("hide");
//         } else {
//             slide.classList.add("show");
//             slide.classList.add("hide");
//         }
        
//     });

//     activateDot(index);

//     slideIndex = index;

// }

// function activateDot(index) {

//     allDots.forEach((dot, i) => {
//         if (i == index - 1) {
//             dot.classList.add("active-dot");
//         } else {
//             dot.classList.remove("active-dot");
//         }
//     });
// }
