const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png")
ASSET_MANAGER.queueDownload("./sprites/ChiefSprites.png");
ASSET_MANAGER.queueDownload("./sprites/sniper1.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	// Add the Character
	gameEngine.addEntity(new MasterChief(gameEngine));

	// Put the context into the game engine
	gameEngine.init(ctx);

	// Start the game engine.
	gameEngine.start();
});
