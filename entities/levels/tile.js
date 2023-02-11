class Tile {
    constructor(game, x, y, tileSet, firstGID, GID) {
        Object.assign(this, { game, x, y, tileSet, firstGID, GID});

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
        //console.log("Tile = " + tileSet["image"] + ", row = " + row + ", col = " + col);
        this.idRow = row;
        this.idCol = col;

        this.generateCollision();

    };


    update() {
        

    }

    updateBB() {

    }

    draw(ctx) {

        let spriteX = (this.margin + (this.tileWidth + this.spacing) * this.idCol);
        let spriteY = (this.margin + (this.tileHeight + this.spacing) * this.idRow);
        ctx.drawImage(this.spritesheet, spriteX, spriteY, this.tileWidth, this.tileHeight, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

    }

    generateCollision() {
            // let tiles = this.tileSet["tiles"];
            // console.log(tiles);
            // tiles.forEach(element => {
            //     //if Ids match, check for collision data
            //     if (element["id"] === this.localID) {

            //     }
            // });
    }

};