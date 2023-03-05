const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Guns.png");


ASSET_MANAGER.queueDownload("./sprites/GruntSprites.png");
ASSET_MANAGER.queueDownload("./sprites/grunt.png");
ASSET_MANAGER.queueDownload("./sprites/elite.png");
ASSET_MANAGER.queueDownload("./sprites/brute.png");

ASSET_MANAGER.queueDownload("./sprites/Grass Blocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks2.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks3.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingDoor.png");
ASSET_MANAGER.queueDownload("./sprites/Healthpack.png");
ASSET_MANAGER.queueDownload("./sprites/BasicTrees.png");
ASSET_MANAGER.queueDownload("./sprites/BlueBase.png");
ASSET_MANAGER.queueDownload("./sprites/RedBase.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod1.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod2.png");

ASSET_MANAGER.queueDownload("./images/FOREST.png")
ASSET_MANAGER.queueDownload("./images/cityfar.png")
ASSET_MANAGER.queueDownload("./images/nightsky.png")
ASSET_MANAGER.queueDownload("./images/cityclose.png")
ASSET_MANAGER.queueDownload("./images/nightBG.png")

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

	

	// layer = new Layer(nightsky, 0);
	// gameEngine.addEntity(layer)

	ctx.imageSmoothingEnabled = false;


	gameEngine.init(ctx);

	gameEngine.start();
});
