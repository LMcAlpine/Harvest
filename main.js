const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Guns.png");
ASSET_MANAGER.queueDownload("./sprites/GunWorldEntities.png");
ASSET_MANAGER.queueDownload("./sprites/crosshairs.png");


ASSET_MANAGER.queueDownload("./sprites/GruntSprites.png");
ASSET_MANAGER.queueDownload("./sprites/Blood Impacts.png");
ASSET_MANAGER.queueDownload("./sprites/EliteSprites.png");

ASSET_MANAGER.queueDownload("./sprites/Grass Blocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks2.png");
ASSET_MANAGER.queueDownload("./sprites/EarthBlocks3.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingBlocks.png");
ASSET_MANAGER.queueDownload("./sprites/BuildingDoor.png");
ASSET_MANAGER.queueDownload("./sprites/BasicTrees.png");
ASSET_MANAGER.queueDownload("./sprites/BlueBase.png");
ASSET_MANAGER.queueDownload("./sprites/RedBase.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod1.png");
ASSET_MANAGER.queueDownload("./sprites/HaloPod2.png");
ASSET_MANAGER.queueDownload("./sprites/BasicTrees.png");

ASSET_MANAGER.queueDownload("./images/FOREST.png")
ASSET_MANAGER.queueDownload("./images/cityfar.png")
ASSET_MANAGER.queueDownload("./images/nightsky.png")
ASSET_MANAGER.queueDownload("./images/cityclose.png")
ASSET_MANAGER.queueDownload("./images/nightBG.png")
ASSET_MANAGER.queueDownload("./images/backtrees.png")
ASSET_MANAGER.queueDownload("./images/fronttrees.png")
ASSET_MANAGER.queueDownload("./images/haloring.png");
ASSET_MANAGER.queueDownload("./images/covenantGlass.png");
ASSET_MANAGER.queueDownload("./images/cityFlames.png");
ASSET_MANAGER.queueDownload("./images/skyBurning.png");

ASSET_MANAGER.queueDownload("./music/Halo.mp3");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_dryfire.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_1.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_2.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_3.wav");
ASSET_MANAGER.queueDownload("./sounds/assault_rifle_fire_brown2_4.wav");
ASSET_MANAGER.queueDownload("./sounds/ar_ammo_ar_reload.wav");


ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle1.wav");
ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle2.wav");
ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle3.wav");
ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle4.wav");
ASSET_MANAGER.queueDownload("./sounds/plasma_rifle_fire_plasmarifle5.wav");

ASSET_MANAGER.queueDownload("./sounds/plaspistol_overheat_1.wav");


ASSET_MANAGER.queueDownload("./sounds/shotgun_fire_shotgun6050.wav");
ASSET_MANAGER.queueDownload("./sounds/shotgun_reload4_reload3-2empty.wav");

ASSET_MANAGER.queueDownload("./sounds/sniper_rifle_fire_ruger21.wav");
ASSET_MANAGER.queueDownload("./sounds/sniper_reload_empty.wav");


ASSET_MANAGER.queueDownload("./sounds/smg/dryfire[pistdryfire].wav");

ASSET_MANAGER.queueDownload("./sounds/smg/fire[smg_new01].wav");
ASSET_MANAGER.queueDownload("./sounds/smg/fire[smg_new02].wav");
ASSET_MANAGER.queueDownload("./sounds/smg/fire[smg_new03].wav");
ASSET_MANAGER.queueDownload("./sounds/smg/fire[smg_new04].wav");

ASSET_MANAGER.queueDownload("./sounds/smg/smg_reload[smg_reload].wav");


ASSET_MANAGER.queueDownload("./sounds/death_instant.5.ogg");
ASSET_MANAGER.queueDownload("./sounds/death_violent.2.ogg");


// elite death
ASSET_MANAGER.queueDownload("./sounds/deathviolent.die02.ogg");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");


	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;



	//document.documentElement.style.cursor = 'none';

	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;



	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock;


	//Diables default cursor
	canvas.style.cursor = "none";

	//console.log(floorCollisions);

	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
	} else {
		console.log('The pointer lock status is now unlocked');
	}




	gameEngine.addEntity(new SceneManager(gameEngine));



	// layer = new Layer(nightsky, 0);
	// gameEngine.addEntity(layer)

	ctx.imageSmoothingEnabled = false;


	gameEngine.init(ctx);

	gameEngine.start();
});
