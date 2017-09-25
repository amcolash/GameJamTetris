class Grid {
    private group:Phaser.Group;
    private deadBlocks:Block[];
    deadPoints:Phaser.Point[];

    constructor(width:number, height:number, game:Phaser.Game) {
        this.group = game.add.group();

        this.group.createMultiple(width * height, BlockColor[BlockColor.WHITE], [0], true);
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.setAll("alpha", 0.5);
        this.group.align(width, height, blockSize, blockSize);

        this.deadBlocks = [];
    }

    addDeadBlock(block:Block) {
        this.deadBlocks.push(block);

        this.deadPoints = [];
        for (let b of this.deadBlocks) {
            let temp:Phaser.Point[] = b.getBlockedPoints();
            
            for (let p of temp) {
                this.deadPoints.push(p);
            }
        }

        console.log(this.deadBlocks);
        console.log(this.deadPoints);
    }
}