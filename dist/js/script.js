window.addEventListener("DOMContentLoaded", () =>   {

    // Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabscontent = document.querySelectorAll(".tabcontent"),
          tabsHeader = document.querySelector(".tabheader");

    function hideTabContent() {
        tabscontent.forEach(item => {
            item.classList.remove("show", "fade");
            item.classList.add("hide");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabscontent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
        tabscontent[i].classList.remove("hide");
    }
    
    hideTabContent();
    showTabContent();

    tabsHeader.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {

                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
    
            });
        }
    });


    //timer

    const deadline = "2025-01-15";

    function getTimeRemaining(endTime) {
        const t = new Date(endTime) - new Date(),
              days = Math.floor( (t/(1000*60*60*24)) ),
              seconds = Math.floor( (t/1000) % 60 ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            "total": t,
            "days": days,
            "seconds": seconds,
            "minutes": minutes,
            "hours": hours
        };
    }

    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock(".timer", deadline);


    // Modal

    const modalTrigger = document.querySelectorAll("[data-modal]"),
          modalCloseBtn = document.querySelector("[data-close]"),
          modal = document.querySelector(".modal");

    const modalTrigerTimerId = setTimeout(showModal, 5000, modal);

    function showModal(element) {
        element.classList.add("show");
        element.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearTimeout(modalTrigerTimerId);
    }

    function showModalByScroll() {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modal);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    function hideModal(element) {
        element.classList.remove("show");
        element.classList.add("hide");
        document.body.style.overflow = "";
    }
    
    modalTrigger.forEach( e => {
        e.addEventListener("click", () => {
            showModal(modal)
        });
    });

    modalCloseBtn.addEventListener("click", () => {
        hideModal(modal)
    });

    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            hideModal(modal);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            hideModal(modal); 
        }
    });

    window.addEventListener("scroll", showModalByScroll);

});

// class

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
    }

    render() {
        const card = document.createElement("div");

        card.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> рублей</div>
                </div>
            </div>
        `;

        this.parent.append(card);
    }
};

const vegy = new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, ".menu .container").render();
