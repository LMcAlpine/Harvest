class Tile {
    constructor(game, x, y, tileSet, firstGID, GID) {
        Object.assign(this, { game, x, y, tileSet, firstGID, GID });

        this.hasCollisions = false;

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

        this.lastBB;
        this.BB;

        this.generateCollision();


    };


    update() {

        this.updateBB();

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + this.bbX, this.y + this.bbY, this.tileWidth * PARAMS.SCALE, this.tileHeight * PARAMS.SCALE);
        //  this.leftBB = new BoundingBox(this.x, this.y, this.tileWidth * PARAMS.SCALE, this.tileHeight * PARAMS.SCALE);
        //console.log("BB X: " + this.BB.x + "BB Y: " + this.BB.y);
    }

    draw(ctx) {

        let spriteX = (this.margin + (this.tileWidth + this.spacing) * this.idCol);
        let spriteY = (this.margin + (this.tileHeight + this.spacing) * this.idRow);

        ctx.drawImage(this.spritesheet, spriteX, spriteY, this.tileWidth, this.tileHeight, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

        //Draw Bounding box
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
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
                        }
                    }
                    //});

                    break;
                }
            }
        }

    }

};