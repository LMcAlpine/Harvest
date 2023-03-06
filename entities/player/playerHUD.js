class PlayerHUD {
    constructor(player, game) {
        Object.assign(this, { player, game });
        ///this.removeFromWorld = false;

        this.hpWidth = 200;
        this.hpHeight = 30;

        this.shieldWidth = 400;
        this.shieldHeight = 40;

        this.Crosshair = new Crosshair(player, game);
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

        if (PARAMS.DEBUG) {
            offscreenCtx.strokeStyle = "White";
            offscreenCtx.strokeRect(0, 0, width, height);
        }

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

class Crosshair {
    constructor(player, game) {
        Object.assign(this, { player, game });

        this.crosshairSprites = ASSET_MANAGER.getAsset("./sprites/crosshairs.png");

        this.position = {
            x: 0,
            y: 0,
        }

        this.width = 20;


        this.onTarget = false;

        this.BB = null;
        this.BBXOffset = -5 * PARAMS.SCALE; //Offset for adjusting BB
        this.BBYOffset = -5 * PARAMS.SCALE; //Offset for adjusting BB
        this.updateBB();

        this.game.addEntity(this);
        this.game.addCollisionEntity(this);
    }

    update() {
        if (this.game.mouse !== null) {
            this.position.x = this.game.mouse.x - (12 * PARAMS.SCALE);
            this.position.y = this.game.mouse.y - (12 * PARAMS.SCALE);
            this.updateBB();
        }

        this.checkCollisions();

    }

    updateBB() {
        this.lastBB = this.BB;

        //console.log("bbx pos: " + (this.position.x - this.BBXOffset + this.game.camera.x) + " bby pos: " + (this.position.y - this.BBYOffset + this.game.camera.y));

        this.BB = new BoundingBox(
            this.position.x - this.BBXOffset + this.game.camera.x,
            this.position.y - this.BBYOffset + this.game.camera.y,
            (this.width * PARAMS.SCALE) - (10 * PARAMS.SCALE),
            (this.width * PARAMS.SCALE) - (10 * PARAMS.SCALE));
    }

    checkCollisions() {
        this.game.collisionEntities.forEach(entity => {

            //Collision
            if (entity.BB && this.BB.collide(entity.BB)) {
                if (entity instanceof Grunt || entity instanceof Elite) {
                    if (entity.isAlive) this.onTarget = true;

                } else {
                    this.onTarget = false;
                }
            }

        });
    }

    draw(ctx) {

        let gun = this.player.currentGun;
        let crosshairY = gun.getGunInfo().crosshairY;

        if (this.game.mouse !== null) {

            if (!this.onTarget) {
                //console.log("NO TARGET");
                ctx.drawImage(this.crosshairSprites,
                    0, crosshairY, //source from sheet
                    50, 50,
                    this.position.x, this.position.y,
                    this.width * PARAMS.SCALE,
                    this.width * PARAMS.SCALE);
            } else {
                // console.log("TARGET FOUND");
                ctx.drawImage(this.crosshairSprites,
                    50, crosshairY, //source from sheet
                    50, 50,
                    this.position.x, this.position.y,
                    this.width * PARAMS.SCALE,
                    this.width * PARAMS.SCALE);
            }

            if (PARAMS.DEBUG && this.BB) {
                ctx.strokeStyle = 'red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }


    };
}