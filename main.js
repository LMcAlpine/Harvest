const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/tempPlayer.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	// Add the Character
	gameEngine.addEntity(new Player(gameEngine));

	// Put the context into the game engine
	gameEngine.init(ctx);

	// Start the game engine.
	gameEngine.start();
});
