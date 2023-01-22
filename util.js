/** Global Parameters Object */
const params = {};

/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
const randomInt = n => Math.floor(Math.random() * n);

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

/** Creates an alias for requestAnimationFrame for backwards compatibility */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback, element) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();

/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * 
 * 
 *  does the bottom of the player intersect with the top of the collision block?
 *  and does the top of the player intersect with the bottom of the collision block?
 *  and does our players left side intersect with the the blocks right side?
 *  and is the right side of the player intersect with the left side of the collision block?
 * 
 * @param {Object} param0 
 * @returns 
 */
const collision = ({ object1, object2 }) => {
    return (
        object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x);
}


const PARAMS = {
    DEBUG: true,
    SCALE: 3,
    BITWIDTH: 16
};

// Player physics
const PHYSIC_SCALE = 3; 
const GRAVITY = 1.5; 
const PLAYER_JUMP = 1000;
const PLAYER_PHYSICS = {
    MAX_WALK: 90 * PHYSIC_SCALE,
    MAX_RUN: 180 * PHYSIC_SCALE,
    ACC_WALK: 180 * PHYSIC_SCALE,
    ACC_RUN: 400 * PHYSIC_SCALE,
    CROUCH_SPEED: 50 * PHYSIC_SCALE,
    JUMP_HEIGHT: PLAYER_JUMP,
    DOUBLE_JUMP_HEIGHT: PLAYER_JUMP * .25,
    MAX_FALL: 300 * PHYSIC_SCALE,
    ACC_FALL: PLAYER_JUMP * GRAVITY
};


function rotateImage(spritesheet, xStart, yStart, width, height, theta, scale, flip) {
    //width *= 2;
    //height *= 2;
    let offscreenCanvas = document.createElement('canvas');
    let dimension = Math.max(width, height) * scale;
    offscreenCanvas.width = dimension;
    offscreenCanvas.height = dimension;
    let offscreenCtx = offscreenCanvas.getContext('2d');

    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.save();
    offscreenCtx.translate(offscreenCanvas.width/2 , offscreenCanvas.height/2);
    if (flip) {
        offscreenCtx.scale(-1,1);
    }
    
    offscreenCtx.rotate(theta);

    offscreenCtx.translate(-offscreenCanvas.width/2 , -offscreenCanvas.height/2);

    offscreenCtx.drawImage(spritesheet,
        xStart, yStart, width, height,
        width * scale < dimension ? (dimension - width * scale) / 2 : 0,
        height * scale < dimension ? (dimension - height * scale) / 2 : 0, width * scale, height * scale);
    offscreenCtx.restore();
    return offscreenCanvas;

}