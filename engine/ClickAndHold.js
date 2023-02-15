class ClickAndHold {
    /**
     * 
     * @param {EventTarget} Event to apply to
     * @param {Function} function to run when mouse is held down
     */
    constructor(target, callback) {

        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;


        ["mousedown", "touchstart"].forEach(type => {
            this.target.addEventListener(type, this.onHoldStart.bind(this));
        });

        ["mouseup", "mouseleave", "mouseout"].forEach(type => {
            this.target.addEventListener(type, this.onHoldEnd.bind(this));
        });

    }

    onHoldStart() {
        console.log("Pressed");
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                //console.log("CALLBACK?");
                this.callback();
            }
        }, 50);
    }

    onHoldEnd() {
        console.log("Let go");
        this.isHeld = false;
        clearTimeout(this.activeHoldTimeoutId);
    }

    static apply(target, callback) {
        new ClickAndHold(target, callback);
    }

    
}