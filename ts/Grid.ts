class Grid {
    group:Phaser.Group;
    deadBlocks:Block[];

    constructor(width:number, height:number, game:Phaser.Game) {
        this.group = game.add.group();

        this.group.createMultiple(width * height, BlockColor[BlockColor.WHITE], [0], true);
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.setAll("alpha", 0.5);
        this.group.align(width, height, blockSize, blockSize);

        this.deadBlocks = [];
    }
}