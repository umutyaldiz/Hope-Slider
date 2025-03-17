import SwiperView from "./components/SwiperView.js";
import TouchHandler from "./components/TouchHandler.js";



export default class HopeSlider {
    constructor(container, options = {}) {
        this.view = new SwiperView(container);
        this.slides = this.view.wrapper.children;
        this.currentIndex = 0;
        this.startX = 0;
        this.currentTranslate = 0;
        this.isDragging = false;
        this.threshold = options.threshold || 50;
        this.loop = options.loop !== false;
        this.callbacks = options.callbacks || {};
        this.events = {};
        this.logContainer = document.querySelector(options.logEl);
        this.initNavigation(options.navigation);
        this.initPagination(options.pagination);

        this.touchHandler = new TouchHandler({
            onStart: (pos) => this.start(pos),
            onMove: (pos, velocity) => this.move(pos, velocity),
            onEnd: (velocity) => this.end(velocity)
        });
        this.touchHandler.attach(this.view.container);
    }

    addEventListener(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    dispatchEvent(event, detail) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(detail));
        }
        if (this.logContainer) {
            const logEntry = document.createElement("div");
            logEntry.textContent = `${event}: ${JSON.stringify(detail)}`;
            this.logContainer.prepend(logEntry);
            if (this.logContainer.childNodes.length > 20) {
                this.logContainer.removeChild(this.logContainer.lastChild);
            }
        }
    }

    start(position) {
        this.startX = position;
        this.isDragging = true;
        this.view.setTransition(false);
        this.dispatchEvent('SlideStart', this.currentIndex);
    }

    move(position) {
        if (!this.isDragging) return;
        let diff = position - this.startX;
        this.view.updatePosition(this.currentTranslate + diff);
        this.dispatchEvent('SlideProgress', { index: this.currentIndex, diff });
    }

    end() {
        if (!this.isDragging) return;
        this.isDragging = false;
        let movedBy = parseInt(this.view.wrapper.style.transform.replace("translateX(", "").replace("px)", "")) - this.currentTranslate;
        if (Math.abs(movedBy) > this.threshold) {
            this.currentIndex += movedBy > 0 ? -1 : 1;
        }
        if (this.loop) {
            this.currentIndex = (this.currentIndex + this.slides.length) % this.slides.length;
        } else {
            this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.slides.length - 1));
        }
        this.updatePosition();
    }

    updatePosition() {
        this.currentTranslate = -this.currentIndex * this.view.container.clientWidth;
        this.view.setTransition(true);
        this.view.updatePosition(this.currentTranslate);
        this.dispatchEvent('SlideChange', this.currentIndex);
        this.updatePagination();
    }

    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }

    goToSlide(index) {
        if (this.loop) {
            index = (index + this.slides.length) % this.slides.length;
        } else {
            index = Math.max(0, Math.min(index, this.slides.length - 1));
        }
        this.currentIndex = index;
        this.updatePosition();
    }

    initNavigation(enabled) {
        if (!enabled) return;
        const prevButton = document.querySelector(enabled.prevEl);
        const nextButton = document.querySelector(enabled.nextEl);

        if (prevButton) {
            prevButton.addEventListener("click", () => this.prevSlide());
        }
        if (nextButton) {
            nextButton.addEventListener("click", () => this.nextSlide());
        }
    }

    initPagination(enabled) {
        if (!enabled) return;
        this.paginationContainer = document.querySelector(enabled.el);
        this.updatePagination();
    }

    updatePagination() {
        if (!this.paginationContainer) return;
        this.paginationContainer.innerHTML = "";
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === this.currentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => this.goToSlide(i));
            this.paginationContainer.appendChild(dot);
        }
    }
}