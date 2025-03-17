export default class SwiperView {
    constructor(container) {
        this.container = container;
        this.wrapper = this.container.querySelector(".hope-wrapper");
        this.wrapper.classList.add("flex", "transition-transform", "duration-300", "ease-out");
        this.container.classList.add("overflow-hidden", "relative", "w-full");
    }

    updatePosition(translateX) {
        this.wrapper.style.transform = `translateX(${translateX}px)`;
    }

    setTransition(enable) {
        this.wrapper.style.transition = enable ? "transform 0.3s ease-out" : "none";
    }
}