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

});

