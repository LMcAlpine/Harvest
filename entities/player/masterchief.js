

if (this.deathAnimation.isDone()) { //Draw last frame when death animation completes
    console.log("DEATH DONE");
    if (this.aimRight) {
        this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx, 
            this.position.x - this.width - this.game.camera.x, 
            this.position.y - this.game.camera.y, 
            this.scale, false, 4);
    } else {
        this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx, 
            this.position.x - this.game.camera.x, 
            this.position.y - this.game.camera.y - 30, 
            this.scale, true, 4);
    }
}

}



};

/**
* Method will rotate chief's arm/gun and draw it depending on the direction
* the player is aiming.
* @param {*} ctx 
*/
drawGun(ctx) {

this.findMouseAngle(); //Get angle in degrees player is aiming, sets to global this.degrees

//Grabs animator object for gun, manually resets to first frame (idle, not shooting) once animation completes.
let a = this.gunAnimations[this.gunType][this.isFiring];
a.elapsedTime += this.game.clockTick;
if (a.isDone()) {
    if (a.loop) {
        a.elapsedTime -= a.totalTime;
    }
    else {
        //Reset animation once complete
        a.reset();
        this.isFiring = 0; //After firing one bullet, firing animation returns to idle
    }
}
let frame = a.currentFrame();
if (a.reverse) frame = a.frameCount - frame - 1;

// Will only draw a new offscreencanvas if the gun was never drawn at this.degrees and the animator frame prior
if (!this.cache[ [this.degrees, frame] ]) { 

let radians = -this.degrees / 360 * 2 * Math.PI; //Convert degrees to radians

//Offscreen canvas conversions depend on direction player is aiming
if (this.aimRight) {
    var offscreenCanvas = rotateImage(a.spritesheet,
        a.xStart + frame * (a.width + a.framePadding), a.yStart,
        a.width, a.height,
        radians, 5,
        false);
} else {
    var offscreenCanvas = rotateImage(a.spritesheet,
        a.xStart + frame * (a.width + a.framePadding), a.yStart,
        a.width, a.height,
        -radians - Math.PI, 5,
        true);
}
this.cache[[this.degrees, frame]] = offscreenCanvas; //Cache the offscreen canvas to avoid redrawing in the future

}


//Adjust arm position depending on face
if (this.aimRight) {
var armXOffset = (76 * this.scale);
} else {
var armXOffset = (64 * this.scale);
}
var armYOffset = (72 * this.scale);


//Draw the gun/arm
ctx.drawImage(this.cache[[this.degrees, frame]],
(this.position.x - this.game.camera.x) - armXOffset, (this.position.y - this.game.camera.y) - armYOffset,
this.scale * a.width, this.scale * a.width);


};

findMouseAngle() {

//Calculating angle from mouse
if (gameEngine.mouse !== null) {

let yOffset = 24 * this.scale;
let xOffset = 25 * this.scale;

let opp = -(gameEngine.mouse.y - (this.position.y - this.game.camera.y) - yOffset);
let adj = gameEngine.mouse.x - (this.position.x - this.game.camera.x) - xOffset;

let angle = Math.atan(opp / adj);
this.degrees = Math.floor(angle * (180 / Math.PI));

//Correct angle to represent 360 degrees around player
if (opp >= 0 && adj < 0) {
    this.degrees += 180;
} else if (opp < 0 && adj < 0) {
    this.degrees += 180;
} else if (opp < 0 && adj >= 0) {
    this.degrees += 360;
}

/* This code will change the angle of chief's helmet depending on where he is aiming (low, normal, high).
*  The animation time is captured as changing states rapidly like this leads to animations between the body
*  parts to desync.  timeSync is used to sychronize body/head animations.
*/
//Record the current elapsed time of animation state
let timeSync = this.bodyAnimations[this.state][this.helmet][this.shieldDamage].elapsedTime;
//Set helmet animation
if ((this.degrees <= 90 && this.degrees > 30) || (this.degrees > 90 && this.degrees <= 150)) {
    this.helmet = 2;
} else if ((this.degrees >= 270 && this.degrees < 330) || (this.degrees < 270 && this.degrees > 210)) {
    this.helmet = 1;
} else {
    this.helmet = 0;
}
//Restore prev captured animation elapsed time (This will sync the animations)
this.bodyAnimations[this.state][this.helmet][this.shieldDamage].elapsedTime = timeSync;

}

};

/**
* Sets animation reverse flag to cond. Mainly used to reverse walking animation when walking
* backwards.
* @param {boolean} cond 
*/

reverseMovement(cond) {
this.bodyAnimations[this.state][this.helmet][this.shieldDamage].reverse = cond;
};



takeDamage(dmg) {
this.regen = 200;

if(this.shield > 0) {
this.shield -= dmg;
if (this.shield <= 0) dmg = Math.abs(this.shield);
}
if (this.shield <= 0 && this.hp > 0) {
this.shield = 0;
this.hp -= dmg;
} 
if (this.hp <= 0 ) {
this.hp = 0;
this.die();
}
}


addHealth() {
// Add to HP
}

regenShield() {
const TICK = this.game.clockTick;
if (this.shield < this.maxShield) {
//console.log(this.regenTimer);
if (this.regenTimer < 4.2) {
    this.regenTimer += TICK;
} else {
    this.shield += 80 * TICK;
}
}
}

die() {
this.isAlive = false;
this.velocity.x = 0;
this.game.camera.scene = 3;
}

};

// *** Keys ***
const keys = {
a: { // Left key
pressed: false
},
d: { // Right key
pressed: false
},
' ': { // Up key
pressed: false
},
r: { // reload key
pressed: false
}

}

// *** KeyDown ***
window.addEventListener('keydown', (event) => {
switch (event.key) {
// Player Keys
case 'd':
keys.d.pressed = true;
this.lastKey = 'd';
break
case 'a':
keys.a.pressed = true;
this.lastKey = 'a';
break
case ' ':
keys[' '].pressed = true;
break
case 'r':
keys.r.pressed = true;
break
}
})

// *** KeyUp ***
window.addEventListener('keyup', (event) => {
switch (event.key) {
// Player Keys
case 'd':
keys.d.pressed = false;
break
case 'a':
keys.a.pressed = false;
break
case ' ':
keys[' '].pressed = false;
break
case 'r':
keys.r.pressed = false;
break
}
})