export default class TouchHandler {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.velocity = 0;
        this.lastMoveTime = 0;
    }

    attach(container) {
        container.addEventListener("touchstart", (e) => this.start(e.touches[0].clientX));
        container.addEventListener("touchmove", (e) => this.move(e.touches[0].clientX));
        container.addEventListener("touchend", () => this.end());
        container.addEventListener("mousedown", (e) => this.start(e.clientX));
        container.addEventListener("mousemove", (e) => this.move(e.clientX));
        container.addEventListener("mouseup", () => this.end());
        container.addEventListener("mouseleave", () => this.end());
    }

    start(position) {
        this.lastPosition = position;
        this.velocity = 0;
        this.lastMoveTime = Date.now();
        this.callbacks.onStart?.(position);
    }

    move(position) {
        const now = Date.now();
        const timeDiff = now - this.lastMoveTime;
        if (timeDiff > 0) {
            this.velocity = (position - this.lastPosition) / timeDiff;
        }
        this.lastPosition = position;
        this.lastMoveTime = now;
        this.callbacks.onMove?.(position, this.velocity);
    }

    end() {
        this.callbacks.onEnd?.(this.velocity);
    }
}