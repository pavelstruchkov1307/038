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