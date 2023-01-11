const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");


	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;




	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
	} else {
		console.log('The pointer lock status is now unlocked');
	}

	const ctx = canvas.getContext("2d");

	// Add the Character
	let player = new Player(gameEngine);
	gameEngine.addEntity(player);
	gameEngine.player = player;



	// Put the context into the game engine
	gameEngine.init(ctx);

	// Start the game engine.
	gameEngine.start();
});
