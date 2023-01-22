
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

    drawFrameAndRotate(tick, ctx, x, y, scale, aimRight, angle) {
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

        let radians = -angle / 360 * 2 * Math.PI;
            
        if (aimRight) {
            // console.log(this.spritesheet);
            var offscreenCanvas = rotateImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, 
                this.width, this.height,
                radians, 5,
                false);

        } else {
            //console.log('Aim Left');
            var offscreenCanvas = rotateImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, 
                this.width, this.height,
                -radians - Math.PI, 5,
                true);

        }

        //Offset to shift chief's shoulder back in it's socker when he changes face
        if (aimRight) {
            var armXOffset = 154;
        } else {
            var armXOffset = 126;
        }

        ctx.drawImage(offscreenCanvas, 
                x - armXOffset, y - 146, 
                scale * 180, scale * 180);

        // if (true) {
        //     ctx.strokeStyle = 'Blue';
        //     ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        // }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};



