class Tile {
    constructor(game, x, y, tileSet, firstGID, GID) {
        Object.assign(this, { game, x, y, tileSet, firstGID, GID });

        this.hasCollisions = false;
        this.collisionActive = false; //used for debugging
        
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/" + tileSet["image"]);

        this.margin = tileSet["margin"];
        this.spacing = tileSet["spacing"];
        this.columns = tileSet["columns"];
        this.tileCount = tileSet["tilecount"];
        this.tileWidth = tileSet["tilewidth"];
        this.tileHeight = tileSet["tileheight"];

        this.localID = GID - firstGID;
        //console.log(this.localID);
        let rowCount = (this.tileCount / this.columns);
        //console.log(rowCount);

        //Need to draw the correct block in the spritesheet based off its localID

        let count = 0;
        loop1:
        for (var row = 0; row < rowCount; row++) {
            for (var col = 0; col < this.columns; col++) {
                if (count === this.localID) {
                    break loop1;
                } else {
                    count++;
                }
            }
        }

        this.idRow = row;
        this.idCol = col;

        this.BB;
        this.leftBB;
        this.rightBB;
        this.bottomBB;
        this.topBB;

        this.generateCollision();


    };


    update() {

        //Commenting this out, BB should not be updating, position will always be static
        //this.updateBB();

    }

    updateBB() {

        if (this.hasCollisions) {
            this.lastBB = this.BB;
            this.BB = new BoundingBox(this.x + this.bbX, this.y + this.bbY, this.tileWidth * PARAMS.SCALE, this.tileHeight * PARAMS.SCALE);
            //console.log("BB X: " + this.BB.x + "BB Y: " + this.BB.y);
        }
    }

    draw(ctx) {

        //Will only draw tiles within camera view!
        if (this.x > this.game.camera.x - PARAMS.BLOCKWIDTH && this.x < (this.game.camera.x + PARAMS.CANVAS_WIDTH)) {

            let spriteX = (this.margin + (this.tileWidth + this.spacing) * this.idCol);
            let spriteY = (this.margin + (this.tileHeight + this.spacing) * this.idRow);

            ctx.drawImage(this.spritesheet, spriteX, spriteY, this.tileWidth, this.tileHeight, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

            //Draw Bounding box
            if (PARAMS.DEBUG && this.hasCollisions && this.BB) {
                if (this.collisionActive) { //Used for debugging, makes color of BB red for identifying collisions
                    ctx.strokeStyle = 'red';
                } else {
                    ctx.strokeStyle = 'blue';
                }
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);
                ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);
                ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
                ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
                this.collisionActive = false;

            }
        }

    }

    generateCollision() {
        let tiles = this.tileSet["tiles"];
        if (tiles != undefined) { //Not all tileSets have tiles property
            for (let i = 0; i < tiles.length; i++) {
                let element = tiles[i];

                if (element["id"] === this.localID) { //Search tiles array for matching tile ID
                    let objects = element["objectgroup"]["objects"];

                    //Check each object to see if it is labeled for a BoundingBox object
                    //Right now we're just going to only support having one bounding box per
                    //tile, as going over this would require a much larger overhaul.
                    //objects.forEach(element => { //For each for multiple bounding boxes
                    for (let j = 0; j < objects.length; j++) {
                        let object = objects[j];
                        if (object["class"] === 'BB') { //Check if tile has bounding box data
                            this.hasCollisions = true;
                            this.bbWidth = object["width"];
                            this.bbHeight = object["height"];
                            this.bbX = object["x"];
                            this.bbY = object["y"];

                            let posX = this.x + this.bbX;
                            let posY = this.y + this.bbY;
                            let width = this.tileWidth * PARAMS.SCALE;
                            let height = this.tileHeight * PARAMS.SCALE

                            this.BB = new BoundingBox(posX + width / 8, posY, width * 3 / 4, height);
                            this.leftBB = new BoundingBox(posX, posY, width / 2 , height);
                            this.rightBB = new BoundingBox(posX + (width / 2), posY, width / 2 , height);

                            this.topBB =  new BoundingBox(posX, posY, width, height / 2);
                            this.bottomBB =  new BoundingBox(posX, posY + height / 2, width, height / 2);
                        }
                    }
                    //});

                    break;
                }
            }
        }

    }

};