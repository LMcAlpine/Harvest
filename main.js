const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png");
ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Guns.png");


ASSET_MANAGER.queueDownload("./sprites/GruntSprites.png");
ASSET_MANAGER.queueDownload("./sprites/grunt.png");
ASSET_MANAGER.queueDownload("./sprites/elite.png");
ASSET_MANAGER.queueDownload("./sprites/brute.png");

ASSET_MANAGER.queueDownload("./sprites/bricks.png");
ASSET_MANAGER.queueDownload("./sprites/Grass Blocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/tree1.png");
ASSET_MANAGER.queueDownload("./sprites/tree2.png");

ASSET_MANAGER.queueDownload("./images/FOREST.png")
ASSET_MANAGER.queueDownload("./images/cityfar.png")
ASSET_MANAGER.queueDownload("./images/nightsky.png")
ASSET_MANAGER.queueDownload("./images/cityclose.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	//console.log("Hello world");



	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;



	//document.documentElement.style.cursor = 'none';

	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;



	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock;



	//console.log(floorCollisions);

	// canvas.onclick = () => {
	// 	canvas.requestPointerLock();
	// }

	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
	} else {
		console.log('The pointer lock status is now unlocked');
	}

	// Attempt to unlock

	gameEngine.addEntity(new SceneManager(gameEngine));

	let nightsky = ASSET_MANAGER.getAsset("./images/nightsky.png");
	let cityclose = ASSET_MANAGER.getAsset("./images/cityclose.png");
	let forest = ASSET_MANAGER.getAsset("./images/FOREST.png");

	// for the parallax 
	let layer = new Layer(forest, 0.1);
	gameEngine.addEntity(layer);

	// layer = new Layer(nightsky, 0);
	// gameEngine.addEntity(layer)

	ctx.imageSmoothingEnabled = false;


	gameEngine.init(ctx);

	gameEngine.start();
});
