class SceneManager {
    constructor(game) {
        this.game = game;

        // 50 tiles wide
        // 40 tiles tall
        this.floorCollisions2D = [];

        for (let i = 0; i < floorCollisions.length; i += 50) {
            this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        }


        // console.log(this.floorCollisions2D);

        this.collisionBlocks = [];
        // loop through all the rows that make up the image
        this.floorCollisions2D.forEach((row, yIndex) => {
            row.forEach((symbol, xIndex) => {
                if (symbol === 61 || symbol === 62) {
                    console.log("draw block here");
                    this.collisionBlocks.push(new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } }))
                }
            })
        })




        this.loadLevel()

    }

    loadLevel() {

        // let player = new Player({ game: this.game, position: { x: 100, y: 100 }, collisionBlocks: this.collisionBlocks })

        // gameEngine.addEntity(player);
        // gameEngine.player = player;
        
        // Add Master Cheese
        gameEngine.addEntity(new MasterChief(gameEngine));


    }
}