class MasterHealthBar {
    constructor (entity, game) {
        Object.assign(this, {entity, game});
        ///this.removeFromWorld = false;

        this.hpWidth = 200;
        this.hpHeight = 30;

        this.shieldWidth = 400;
        this.shieldHeight = 40;
    }
    
    update() {

    }
    
    draw(ctx) {
        let hpRatio = this.entity.hp / this.entity.maxHP;
        let shieldRatio = this.entity.shield / this.entity.maxShield;
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
    };
}