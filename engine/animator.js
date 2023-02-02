
class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale, flip) {
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

        if (flip) {
            let offScreenCanvas = rotateImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, 
                this.width, this.height,
                0, 1,
                true);
            
            
            ctx.drawImage(offScreenCanvas, 
                x - 15, y, 
                scale * this.height, scale * this.height); //Why does height work here and not width like when rotating gun?

                // ctx.drawImage(offScreenCanvas,
                //     this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
                //     this.width, this.height,
                //     x -10, y,
                //     this.width * scale,
                //     this.height * scale);

        } else {

            ctx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
                this.width, this.height,
                x, y,
                this.width * scale,
                this.height * scale);
        }

        if (true) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        //console.log('Is Done?');
        return (this.elapsedTime >= this.totalTime);
    };

    reset() {
        this.elapsedTime -= this.totalTime;
    }
};



