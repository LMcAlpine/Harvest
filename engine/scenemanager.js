class SceneManager {
    constructor(game) {
        this.game = game;

        this.game.camera = this;
        //RESET THIS BACK TO 0, JUST FOR TESTING
        this.x = 0;
        this.y = 0;
        //Toggle which level to load
        this.level = 0;


        this.numWaves = 5;
        this.enemiesPerWave = [5, 10, 15, 20, 25];
        this.currentWave = 0;
        PARAMS.ENEMIES = this.enemiesPerWave[0];
        this.numEnemies = this.enemiesPerWave[this.currentWave];


        this.loadLevel();
        // this.generateWave();

    }





    loadLevel() {

        //Declare player/enemies
        this.startingPosition = { x: 1000, y: 2200 };
        let player = new MasterChief(gameEngine, this.startingPosition, this.collisionBlocks);
        gameEngine.addEntity(player);
        gameEngine.addCollisionEntity(player);
        gameEngine.player = player;

        this.testPosition = { x: 500, y: 1900 };
        let testEnemy = new Grunt(gameEngine, this.testPosition, this.collisionBlocks);
        gameEngine.addEntity(testEnemy);
        gameEngine.addCollisionEntity(testEnemy);










        let elitePos = { x: 700, y: 2100 };
        let elite = new Elite(this.game, elitePos, this.collisionBlocks);
        gameEngine.addEntity(elite);
        gameEngine.addCollisionEntity(elite);

        if (this.level === 0) {
            new Level0Generator(this.game);
        }


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

    // generateWave() {
    //     for (let i = 0; i < this.numEnemies; i++) {
    //         this.testPosition = { x: 100 * i, y: 1900 + i };
    //         let testEnemy = new Grunt(gameEngine, this.testPosition, this.collisionBlocks);
    //         gameEngine.addEntity(testEnemy);
    //         gameEngine.addCollisionEntity(testEnemy);
    //     }
    //     PARAMS.ENEMIES = this.numEnemies;
    // }

    // checkWave() {
    //     //  this.enemiesRemaining = 0;
    //     if (this.currentWave < this.numWaves && PARAMS.ENEMIES === 0) {
    //         this.currentWave++;
    //         this.generateWave();
    //     }

    // }


    update() {


        let midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;

        //ACTIVE CAMERA
        this.x = this.game.player.position.x - midpointX;
        this.y = this.game.player.position.y - midpointY;

        //  this.checkWave();


    }

    draw(ctx) {
        ctx.font = "50px serif";
        // ctx.fillText("current wave: " + this.currentWave + "", 0, 300)

        // ctx.fillText("enemies remaining: " + PARAMS.ENEMIES + "", 0, 400)
    }
}