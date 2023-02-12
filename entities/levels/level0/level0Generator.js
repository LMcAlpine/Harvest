//Night time level!

class Level0Generator {
    constructor(game) {
        Object.assign(this, { game });
   

        this.level0Map = HaloMap1;
        this.tileSets = {
            "GrassBlocks" : GrassBlocks,
            "tree1" : tree1,
            "tree2" : tree2,
            "EarthBlocks" : EarthBlocks
        }

        //Until we can import JSON correctly, have to copy and paste the JSON file contents
        //this.loadInData();
        

    /*
        //             PLAN: 
        //             0) Loop through each layer starting with the top layer
        //             1) Loop through and get block GID. 
        //             2) Check The Map JSON: Search through 'tilesets' for matching firstGID
        //                will need to compare these values to find which firstGID the GID fits into
        //                as firstGID's range from firstGID to the last tile in the tileset
        //             3) With the source tileset found, open the JSON file
        //             4) Create new tile class, pass in the name of the image json file, the GID, and the firstGID
        //             5) Tile class will use math to find the right tile in the image, thus displaying the image (Take spacing/margin into account)
        //             6) Check json file for collision objects using ID, each object marked "BoundingBox" should have a new bounding box created under it's Tile object,
        //             this bounding box will be added to a global collision array where all bounding boxes will be tracked.  This will eliminate the issue of every single
        //             entity being checked for collisions.
        //             7) Repeat steps for every layer down
        //         
    */
        //Sorted level data per layer
        //this.levelData = [];
        
        let levelData = this.formatLevelData();
        
        this.parseLevelData(levelData);
        //console.log(this.game.collisionEntities);

    };

    //Part 0
    formatLevelData() {
        let levelData = [];
        let layersCount = this.level0Map['layers'].length;
        for(let i = 0; i < layersCount; i++) {
            let layer = this.level0Map['layers'][i];
            
            if (layer["type"] === "tilelayer"){
                let width = layer["width"];
                let height = layer["height"];
                let rawData = layer["data"];
                
                let FormattedData = [];
                for (let id = 0; id < rawData.length; id += width) {
                    FormattedData.push(rawData.slice(id, id + width));
                }
                levelData.push(FormattedData);
         }
        }
        return levelData;

    };

    //Part 1
    parseLevelData(levelData) {
        let tileSheets = this.level0Map["tilesets"];
        let layersCount = levelData.length;
        //Parse each layer
        
        for(let layerNum = layersCount - 1; layerNum >= 0; layerNum--) {
            let layer = levelData[layerNum];
            //console.log("LAYER: " + layer);

            for (let row = 0; row < layer.length; row++) {
                for(let col = 0; col < layer[row].length; col++) {
                    let GID = layer[row][col];
                    
                    //Find TileSet by the GID
                    let t = 0;
                    while(t < tileSheets.length) {
                        var firstGID = tileSheets[t]["firstgid"];
                        
                        if (GID < firstGID) {
                            break;
                        } 
                        t++;  
                    }
                    
                    //Build Tiles
                    t -= 1;
                    if (t > -1) {
                        let tileSetName = tileSheets[t]["source"];
                        let firstGID = tileSheets[t]["firstgid"];
                        let tileSet = this.tileSets[tileSetName.slice(0,-4)];

                        let tile = new Tile(this.game, col * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, tileSet, firstGID, GID);

                        //Check if tile has collision data
                        if (tile.hasCollisions) {
                            this.game.addCollisionEntity(tile);
                        }
                        this.game.addEntity(tile);
                        
                        

                    }


                }
            }
            
        }
    };

    

};