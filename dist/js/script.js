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
});