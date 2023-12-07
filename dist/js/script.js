
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