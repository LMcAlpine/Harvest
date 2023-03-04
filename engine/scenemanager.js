class SceneManager {
    constructor(game) {
        this.game = game;

        this.game.camera = this;
        //RESET THIS BACK TO 0, JUST FOR TESTING
        this.x = 0;
        this.y = 0;

        this.levelGenerator = null;
        //Toggle which level to load
        this.scene = 0; //0 = Start Screen, 1 = Game, 2 = Win Screen, 3 = Death Screen

        this.title = true;


        this.elapsedTime = 0;


        //  this.loadLevel();


        // if (this.title) {
        //     let img = ASSET_MANAGER.getAsset("./images/cityclose.png")
        //     let layer = new Layer(img, 0.2);
        //     gameEngine.addEntity(layer)


        //     img = ASSET_MANAGER.getAsset("./images/nightsky.png")
        //     layer = new Layer(img, 0);
        //     gameEngine.addEntity(layer)


        // }
        // else {
        //     this.loadLevel();
        // }
        this.loadingLevel = false;

        this.click = false;
        this.musicPlaying = false;

        this.music = "./music/Halo.mp3";


        this.ship = ASSET_MANAGER.getAsset("./images/covenantGlass.png");
        this.titleShipX = -this.ship.width;

        if (this.title && this.scene === 0) {
            this.loadTitle();

            window.addEventListener('click', (event) => {
                if (this.music && this.title && !this.musicPlaying) {
                    this.click = true;
                    this.musicPlaying = true;
                    ASSET_MANAGER.playAsset(this.music);
                } else {
                    //  this.click = false;
                }
            })

        }
        else {
            this.loadLevel();
        }

    }

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };



    loadTitle() {
        // let img = ASSET_MANAGER.getAsset("./images/cityclose.png")
        // let layer = new Layer(img, 0.2);
        // gameEngine.addEntity(layer);





        // img = ASSET_MANAGER.getAsset("./images/nightsky.png")
        // layer = new Layer(img, 0);
        // gameEngine.addEntity(layer);
    }


    loadLevel() {

        // if (this.music) {
        //     ASSET_MANAGER.playAsset(this.music);
        // }

        this.loadingLevel = true;

        // stop the title music
        ASSET_MANAGER.pauseBackgroundMusic();
        this.clearEntities();
        this.scene = 1;


        // if (!this.title) {
        let position = {
            x: 400 * PARAMS.SCALE,
            y: 100 * PARAMS.SCALE,
        }

        console.log("Spawning grunt at: " + position.x + ", " + position.y);
        let grunt = new Grunt(gameEngine, position);
        this.game.addEntity(grunt);
        this.game.addCollisionEntity(grunt);



        this.levelGenerator = new Level0Generator(this.game);



        let frontTrees = ASSET_MANAGER.getAsset("./images/fronttrees.png");
        let layer = new Layer(frontTrees, 0.09);
        gameEngine.addEntity(layer);

        let backtrees = ASSET_MANAGER.getAsset("./images/backtrees.png");
        layer = new Layer(backtrees, 0.06);
        gameEngine.addEntity(layer);



        let haloRing = ASSET_MANAGER.getAsset("./images/haloring.png");
        layer = new Layer(haloRing, 0);
        gameEngine.addEntity(layer);


        let nightForest = ASSET_MANAGER.getAsset("./images/nightBG.png");


        // for the parallax 
        layer = new Layer(nightForest, 0);

        gameEngine.addEntity(layer);




        //     }




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

    updateAudio() {
        let mute = document.getElementById("mute").checked;
        let volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    }

    update() {
        if (this.click && this.title) {
            this.elapsedTime += this.game.clockTick;
        }


        this.updateAudio();

        let midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;


        console.log("scene " + this.scene + "title " + this.title)
        //ACTIVE CAMERA
        if (this.scene !== 0) {
            // this.x = this.game.player.position.x - midpointX;
            // this.y = this.game.player.position.y - midpointY;
        }


        if (this.title && this.game.keys.Enter) {
            this.title = false;
            this.scene = 1;
            // this.game.removeEle

            this.loadLevel();
            // this.x = this.game.player.position.x - midpointX;
            // this.y = this.game.player.position.y - midpointY;


        }
        if (!this.title) {
            this.x = this.game.player.position.x - midpointX;
            this.y = this.game.player.position.y - midpointY;
        }

        if (this.titleShipX > PARAMS.CANVAS_WIDTH) {
            this.titleShipX = -this.ship.width;
        }
        this.titleShipX += 0.5;



    }

    draw(ctx) {

        if (this.title && this.scene == 0) {
            ctx.fillStyle = 'black';
            ctx.font = "50px serif";
            //ctx.fillText("TITLE", 100, 100);
            let img = ASSET_MANAGER.getAsset("./images/skyBurning.png")
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let cityflames = ASSET_MANAGER.getAsset("./images/cityFlames.png");
            ctx.drawImage(this.ship, this.titleShipX, 160, this.ship.width, this.ship.height);
            ctx.drawImage(cityflames, 0, 0, cityflames.width, cityflames.height);


            if (this.click && this.title) {
                // this.elapsedTime = 0;
                if (this.elapsedTime >= 7) {



                    let rgbStep = Math.floor(this.osc(80, 255, 0.5));
                    ctx.textAlign = "center";
                    this.drawText("Press Enter to play", 1920 / 2, 510, this.getGray(rgbStep), 50, 43, ctx);
                }

            }





            //ctx.fillText("Press Enter to play", 1920 / 2, 520);




        }


        if (this.scene === 2) {
            this.winScreen(ctx);
        }
        else if (this.scene === 3) {
            this.gameOverScreen(ctx);
        }
        let fps = Math.round(1 / this.game.clockTick);
        //Display bullet count
        ctx.fillStyle = "orange";
        ctx.font = "bold 25px serif";
        ctx.textBaseline = "top";
        // if (fps < 40)
        ctx.fillText(fps, PARAMS.CANVAS_WIDTH / 2, 0);
    }


    drawText(txt, x, y, color, fontSize, fontStrength, ctx) {
        fontStrength = fontStrength || '';
        ctx.font = fontStrength + ' ' + fontSize + 'pt ' + 'serif';
        ctx.fillStyle = color;
        ctx.fillText(txt, x, y);
    }

    getGray(grayLevel) {
        return "rgb(" + grayLevel + "," + grayLevel + "," + grayLevel + ")";
    }


    osc(min, max, freq) {
        return min + 0.5 * (max - min) * (1 + Math.sin(2 * Math.PI * freq * Date.now() / 1000));
    }


    winScreen(ctx) {
        ctx.drawImage(this.ship, this.titleShipX, 160, this.ship.width, this.ship.height);

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