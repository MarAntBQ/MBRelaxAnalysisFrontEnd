document.getElementById("menu-btn").addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "" || mobileMenu.classList == "desactivate-menu") {
        mobileMenu.classList.remove("desactivate-menu");
        mobileMenu.classList.add("active-menu");
    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }
});

document.getElementById("close-btn").addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "" || mobileMenu.classList == "desactivate-menu") {
        mobileMenu.classList.remove("desactivate-menu");
        mobileMenu.classList.add("active-menu");
    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }
});

document.getElementsByTagName("MAIN")[0].addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "") {

    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }
});