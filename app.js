import HopeSlider from "./src/index.js";


// Kullanım
const hopeSlider = new HopeSlider(document.querySelector(".hope-slider"), {
    threshold: 50,
    loop: true,
    navigation: {
        prevEl: '.prev',
        nextEl: '.next'
    },
    pagination: {
        el: '.pagination'
    },
    logEl: "#log-container",
    callbacks: {
        // onSlideStart: (index) => console.log("Slide Start:", index),
        // onSlideChange: (index) => console.log("Slide Changed:", index),
        // onSlideEnd: (index) => console.log("Slide End:", index),
        // onSlideProgress: (index, diff) => console.log("Slide Progress:", index, diff),
        // onTranslateX: (position) => console.log("TranslateX Position:", position)
    }
});

// slider.addEventListener('SlideStart', (index) => {
//     console.log('EventListener - Slide Start:', index);
// });

// slider.addEventListener('SlideChange', (index) => {
//     console.log('EventListener - Slide Changed:', index);
// });

// slider.addEventListener('SlideEnd', (index) => {
//     console.log("EventListener - Slide End:", index);
// });

// slider.addEventListener('SlideProgress', (index, diff) => {
//     console.log("EventListener - Slide Progress:", index, diff);
// });

// slider.addEventListener('TranslateX', (position) => {
//     console.log("EventListener - TranslateX Position:", position);
// });