
class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

        if (true) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        }
    };

    // drawFrame(tick, ctx, x, y, scale) {

    //     this.elapsedTime += tick;
    //     if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
    //     const frame = this.currentFrame();
    //     if (frame !== 0) console.log('Current Frame: ' + frame);
    //     ctx.drawImage(this.spritesheet,
    //         this.xStart + this.width * frame, this.yStart,
    //         this.width, this.height,
    //         x, y,
    //         2*this.width, 2*this.height);
    //         //this.scaleWidth, this.scaleHeight);
    // };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};



