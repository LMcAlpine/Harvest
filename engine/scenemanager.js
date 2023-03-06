class SceneManager {
    constructor(game) {
        this.game = game;
        this.FPSCounter = 0;
        this.FPS = 0;

        this.game.camera = this;

        this.checkPoints = [];
        this.saves = [];

        this.x = 0;
        this.y = 0;

        this.levelGenerator = null;
        //Toggle which level to load
        this.scene = 1; //0 = Start Screen, 1 = Game, 2 = Win Screen, 3 = Death Screen

        this.loadLevel();

        this.saveGame();

    }

    saveGame() {
        let ents = {
            entities : this.game.entities.slice(),
            collisionEntities: this.game.collisionEntities.slice()
        }

        this.saves.push(ents);

    };

    loadGame() {

        let ents = this.saves[this.saves.length - 1];

        this.game.entities = ents["entities"].slice();
        this.game.collisionEntities = ents["collisionEntities"].slice();

    };


    loadLevel() {

        this.scene = 1;

        let position = {
            x: 1877,
            y: 200 * PARAMS.SCALE,
        }

        let position2 = {
            x: 1600,
            y: 200 * PARAMS.SCALE,
        }
        let position3 = {
            x: 1699,
            y: 200 * PARAMS.SCALE,
        }

        //Test entities
        let testGun = new Gun(null, this.game, "PLASMA_RIFLE");
        testGun.position = position;
        testGun.worldEntity = true;

        let testGun2 = new Gun(null, this.game, "SMG");
        testGun2.position = position2;
        testGun2.worldEntity = true;

        let testGun3 = new Gun(null, this.game, "SHOTGUN");
        testGun3.position = position3;
        testGun3.worldEntity = true;

        let testGun4 = new Gun(null, this.game, "SNIPER");
        testGun4.position = position3;
        testGun4.worldEntity = true;

        // let elite = new Elite(gameEngine, position);
        // this.game.addEntity(elite);
        // this.game.addCollisionEntity(elite);
        
        // console.log("Spawning grunt at: " + position.x + ", " + position.y);
        // let grunt = new Grunt(gameEngine, position);
        // this.game.addEntity(grunt);
        // this.game.addCollisionEntity(grunt);

        // console.log("Spawning Master Chief at: " + position.x + ", " + position.y);
        // let player = new MasterChief(gameEngine, position);
        // this.game.addEntity(player);
        // this.game.addCollisionEntity(player);
        // this.game.player = player;

        this.levelGenerator = new Level0Generator(this.game);
        let nightForest = ASSET_MANAGER.getAsset("./images/nightBG.png");

        // for the parallax 
        let layer = new Layer(nightForest, this.game);
        gameEngine.addEntity(layer);

            
            
        //}


        /*
            PLAN: 
            0) Loop through each layer starting with the top layer
            1) Loop through and get block GID. 
            2) Check The Map JSON: Search through 'tilesets' for matching firstGID
                will need to compare these values to find which firstGID the GID fits into
                as firstGID's range from firstGID to the last tile in the tileset
            3) With the source tileset found, open the JSON file
            4) Create new tile class, pass in the name of the image json file, the GID, and the firstGID
            5) Tile class will use math to find the right tile in the image, thus displaying the image (Take spacing/margin into account)
            6) Check json file for collision objects using ID, each object marked "BoundingBox" should have a new bounding box created under it's Tile object,
            this bounding box will be added to a global collision array where all bounding boxes will be tracked.  This will eliminate the issue of every single
            entity being checked for collisions.
            7) Repeat steps for every layer down
        */

        // 0 - Parse Json file



    }

    update() {

        let midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;

        //ACTIVE CAMERA
        this.x = this.game.player.position.x - midpointX;
        this.y = this.game.player.position.y - midpointY;


    }

    draw(ctx) {

        const TICK = this.game.clockTick;

        if (this.scene === 2) {
            this.winScreen(ctx);
        }
        else if (this.scene === 3) {
            this.gameOverScreen(ctx);
        }
        //Display bullet count
        ctx.fillStyle = "orange";
        ctx.font = "bold 25px serif";
        ctx.textBaseline = "top";

        //Display FPS
        if (this.FPSCounter >= 1) {
            this.FPS = Math.round(1 / this.game.clockTick); 
            this.FPSCounter = 0;
        } else {
            this.FPSCounter += TICK;
        }
        ctx.fillText(this.FPS, PARAMS.CANVAS_WIDTH / 2, 0);
    }

    winScreen(ctx) {

        let width = PARAMS.CANVAS_WIDTH;
        let height = PARAMS.CANVAS_HEIGHT;

        let offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        let offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;

        ctx.fillStyle = "rgb(0,0,0,.2)";
        ctx.fillRect(0, 0, width, height);
        offscreenCtx.fillStyle = "White";

        offscreenCtx.fillStyle = "black";
        offscreenCtx.font = "bold 50px Ariel";
        offscreenCtx.textBaseline = "top";
        //offscreenCtx.textAlign = "Center";
        offscreenCtx.fillText("YOU WON", (width / 2) - (width / 16), height / 4);


        ctx.drawImage(offscreenCanvas,
            0, 0,
            width, height);
    }

    gameOverScreen(ctx) {

        let width = PARAMS.CANVAS_WIDTH;
        let height = PARAMS.CANVAS_HEIGHT;

        let offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        let offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;

        ctx.fillStyle = "rgb(0,0,0,.2)";
        ctx.fillRect(0, 0, width, height);
        offscreenCtx.fillStyle = "White";

        offscreenCtx.fillStyle = "black";
        offscreenCtx.font = "bold 50px Ariel";
        offscreenCtx.textBaseline = "top";
        //offscreenCtx.textAlign = "Center";
        offscreenCtx.fillText("YOU LOST: Press SPACE to Reset", (width / 2), height / 4);
        
        
        ctx.drawImage(offscreenCanvas,
            0, 0,
            width, height);
    }
}