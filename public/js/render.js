// AURACSS JAVASCRIPT
// This file has a cuple variables you can modify for a few components
// Changing anything about the functions is NOT recommended.
let slideInterval = 2000;
let slideDuration = 1000;



// References / required by functions.
let burger;
let carousel = document.getElementsByClassName('carousel')[0];
let slideindex = 0

// Runtime
setTimeout(() => {
    burger = document.getElementsByClassName('nav-hamburger')[0];
    burger.href = 'javascript:toggleMobileMenu()';
}, 300);

setInterval(() => Carousel(), slideInterval);

function toggleMobileMenu() {
    let nav = document.querySelector('nav');

    let list = document.querySelectorAll("nav>ul")

    list[0].toggleAttribute("open");

    nav.toggleAttribute('open');
    burger.toggleAttribute('pressed');
}

function Carousel() {
    if(carousel != undefined) {
        slideindex = slideindex + 1
        slideCarousel(slideindex)
    }
}

function slideCarousel(slide) {
    let slides = document.getElementsByClassName("carousel-item")
    let prev = document.getElementsByClassName('carousel-item active')[0]

    if(slideindex > (slides.length-2)){slideindex=-1}

    try {
        prev.classList.remove('slide-in');
        prev.classList.add('slide-out');
    } catch{
        console.log('Carousel slide failed.')
    }
    slides[slide].classList.add('active');
    slides[slide].classList.add('slide-in')

    setTimeout(() => {
        for (let i = 0; i<slides.length;i++) {
            if(i!=slide) {
                slides[i].classList.remove('active')
                slides[i].classList.remove('slide-out')
            }
        }
    }, slideDuration);
}
