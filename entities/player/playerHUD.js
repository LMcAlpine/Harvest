class PlayerHUD {
    constructor (player, game) {
        Object.assign(this, {player, game});
        ///this.removeFromWorld = false;

        this.hpWidth = 200;
        this.hpHeight = 30;

        this.shieldWidth = 400;
        this.shieldHeight = 40;
    }
    
    update() {

    }
    
    draw(ctx) {
        this.drawHealthBar(ctx);
        this.drawGunBar(ctx); 
    };

    drawHealthBar(ctx) {
        let hpRatio = this.player.hp / this.player.maxHP;
        let shieldRatio = this.player.shield / this.player.maxShield;
        ctx.strokeStyle = "White";
        ctx.fillStyle = "rgba(134, 254, 255, 0.8)";
        // Shield Bar
        ctx.fillRect(10, 10, this.shieldWidth * shieldRatio, this.shieldHeight);
        ctx.strokeRect(10, 10, this.shieldWidth, this.shieldHeight);
        // HP Bar
        ctx.strokeStyle = "White";
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.fillRect(10, this.shieldHeight + 20, this.hpWidth * hpRatio, this.hpHeight);
        ctx.strokeRect(10, this.shieldHeight + 20, this.hpWidth, this.hpHeight);
    }

    //TODO
    drawGunBar(ctx) {
        let gun = this.player.currentGun;
        let width = 300;
        let height = 100;

        let offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        let offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;

        offscreenCtx.strokeStyle = "White";
        offscreenCtx.strokeRect(0, 0, width, height);

        //Display bullet count
        offscreenCtx.fillStyle = "cyan";
        offscreenCtx.font = "bold 25px serif";
        offscreenCtx.textBaseline = "top";
        let bulletCount = gun.getCurrentAmmo() + " / " + gun.getMagazineSize();
        offscreenCtx.fillText(bulletCount, 10, 10, width);
        if (gun.isEmpty()) {
            offscreenCtx.fillText("(R) - RELOAD", 100, 10, width);
        }

        ctx.drawImage(offscreenCanvas,
            PARAMS.CANVAS_WIDTH - width - 10, 10,
            width, height);
    }
}