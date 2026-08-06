/*==================================================
=               DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    initHeader();

    initMobileMenu();

    initAccordion();

    initReveal();

    initBackToTop();

    initSmoothScroll();

    initActiveMenu();

    initLazyImage();

    initAppointmentForm();

});

/*==================================================
=               HEADER
==================================================*/

function initHeader() {

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

}

/*==================================================
=               MOBILE MENU
==================================================*/

function initMobileMenu() {

    const openBtn = document.getElementById("mobileMenu");

    const closeBtn = document.getElementById("closeMenu");

    const mobileNav = document.getElementById("mobileNav");

    if (!openBtn || !closeBtn || !mobileNav) return;

    openBtn.onclick = function () {

        mobileNav.classList.add("active");

    }

    closeBtn.onclick = function () {

        mobileNav.classList.remove("active");

    }

    mobileNav.querySelectorAll("a").forEach(function (item) {

        item.onclick = function () {

            mobileNav.classList.remove("active");

        }

    });

    document.addEventListener("click", function (e) {

        if (

            !mobileNav.contains(e.target)

            &&

            !openBtn.contains(e.target)

        ) {

            mobileNav.classList.remove("active");

        }

    });

}

/*==================================================
=               ACCORDION
==================================================*/

function initAccordion() {

    document

        .querySelectorAll(".accordion-header")

        .forEach(function (header) {

            header.onclick = function () {

                const item = this.parentElement;

                if (item.classList.contains("active")) {

                    item.classList.remove("active");

                    return;

                }

                document

                    .querySelectorAll(".accordion-item")

                    .forEach(function (i) {

                        i.classList.remove("active");

                    });

                item.classList.add("active");

            }

        });

}

/*==================================================
=               REVEAL
==================================================*/

function initReveal() {

    const reveals = document.querySelectorAll(".reveal");

    function reveal() {

        const trigger = window.innerHeight - 120;

        reveals.forEach(function (element) {

            const top = element.getBoundingClientRect().top;

            if (top < trigger) {

                element.classList.add("active");

            }

        });

    }

    reveal();

    window.addEventListener("scroll", reveal);

}

/*==================================================
=               BACK TO TOP
==================================================*/

function initBackToTop() {

    const btn = document.getElementById("backToTop");

    if (!btn) return;

    btn.style.opacity = "0";

    btn.style.pointerEvents = "none";

    function toggle() {

        if (window.scrollY > 500) {

            btn.style.opacity = "1";

            btn.style.pointerEvents = "auto";

        } else {

            btn.style.opacity = "0";

            btn.style.pointerEvents = "none";

        }

    }

    toggle();

    window.addEventListener("scroll", toggle);

}

/*==================================================
=               SMOOTH SCROLL
==================================================*/

function initSmoothScroll() {

    document

        .querySelectorAll('a[href^="#"]')

        .forEach(function (anchor) {

            anchor.addEventListener("click", function (e) {

                const target = document.querySelector(

                    this.getAttribute("href")

                );

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top:

                        target.offsetTop - 75,

                    behavior:

                        "smooth"

                });

            });

        });

}

/*==================================================
=               ACTIVE MENU
==================================================*/

function initActiveMenu() {

    const sections = document.querySelectorAll("section[id]");

    const menuLinks = document.querySelectorAll("nav a");

    function active() {

        let current = "";

        sections.forEach(function (section) {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (

                pageYOffset >= top

                &&

                pageYOffset < top + height

            ) {

                current = section.id;

            }

        });

        menuLinks.forEach(function (link) {

            link.classList.remove("active");

            if (

                link.getAttribute("href")

                ===

                "#" + current

            ) {

                link.classList.add("active");

            }

        });

    }

    active();

    window.addEventListener("scroll", active);

}

/*==================================================
=               LAZY IMAGE
==================================================*/

function initLazyImage() {

    const images = document.querySelectorAll("img");

    if (!("IntersectionObserver" in window)) {

        images.forEach(function (img) {

            img.classList.add("loaded");

        });

        return;

    }

    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting)

                    return;

                const img = entry.target;

                img.classList.add("loaded");

                observer.unobserve(img);

            });

        },

        {

            threshold: 0.2

        }

    );

    images.forEach(function (img) {

        img.classList.add("lazy");

        observer.observe(img);

    });

}

/*==================================================
=               APPOINTMENT FORM
==================================================*/

function initAppointmentForm() {

    const form = document.querySelector(

        ".appointment-form form"

    );

    if (!form) return;

    form.addEventListener(

        "submit",

        function (e) {

            e.preventDefault();

            const name =

                form.querySelector(

                    'input[type="text"]'

                ).value.trim();

            const phone =

                form.querySelector(

                    'input[type="tel"]'

                ).value.trim();

            if (name === "") {

                alert("Vui lòng nhập họ tên.");

                return;

            }

            if (phone.length < 9) {

                alert("Số điện thoại không hợp lệ.");

                return;

            }

            alert(

                "Đăng ký khám thành công!"

            );

            form.reset();

        }

    );

}

/*==================================================
=               PRELOADER
==================================================*/

window.addEventListener(

    "load",

    function () {

        const loading =

            document.querySelector(".loading");

        if (!loading) return;

        loading.style.opacity = "0";

        setTimeout(function () {

            loading.remove();

        }, 500);

    }

);

/*==================================================
=               PARALLAX HERO
==================================================*/

window.addEventListener(

    "scroll",

    function () {

        const hero =

            document.querySelector(".hero-image");

        if (!hero) return;

        hero.style.transform =

            "translateY("

            +

            window.scrollY * 0.3

            +

            "px)";

    }

);

/*==================================================
=               COUNTER
==================================================*/

function animateValue(el, start, end, duration) {

    let startTime = null;

    function animation(currentTime) {

        if (!startTime)

            startTime = currentTime;

        let progress = currentTime - startTime;

        let value = Math.min(

            progress / duration,

            1

        );

        el.innerHTML = Math.floor(

            value * (end - start) + start

        );

        if (progress < duration) {

            requestAnimationFrame(animation);

        }

    }

    requestAnimationFrame(animation);

}

/*==================================================
=               KEYBOARD ESC
==================================================*/

document.addEventListener(

    "keydown",

    function (e) {

        if (e.key === "Escape") {

            const nav = document.getElementById("mobileNav");

            if (nav) {

                nav.classList.remove("active");

            }

        }

    }

);

/*==================================================
=               CONSOLE
==================================================*/

console.log(

    "Clinic Website Loaded Successfully"

);

new Swiper(".clinicSwiper", {

    centeredSlides: true,

    slidesPerView: 1.8,

    spaceBetween: 25,

    loop: true,

    speed: 800,

    autoplay: {

        delay: 4000,

        disableOnInteraction: false

    },

    pagination: {

        el: ".swiper-pagination",

        clickable: true

    },

    navigation: {

        nextEl: ".swiper-button-next",

        prevEl: ".swiper-button-prev"

    },

    breakpoints: {

        768: {

            slidesPerView: 2.3

        },

        1200: {

            slidesPerView: 2.7

        }

    }

});