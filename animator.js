// This is the Animator class
class Animator {

    // This is the constructor for the character
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {

        // Copy all of the paramters into the object.
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration});

        // Set the fields
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    // This is the draw frame method
    drawFrame(tick, ctx, x, y) {

        // Properties
        this.elapsedTime += tick;
        const frame = this.currentFrame();

        // Reset the time so the animation loops
        if(this.elapsedTime > this.totalTime) {
            this.elapsedTime -= this.totalTime;
        };

        ctx.drawImage(this.spritesheet,
            this.xStart + (this.width * frame), this.yStart,
            this.width, this.height,
            x, y,
            this.width, this.height);

    };

    // This method gets the current frame.
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    // This is the isDone method.
    isDone() {
        return(this.elapsedTime >= this.totalTime);
    };

}