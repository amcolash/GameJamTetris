class Grid {
    colors: number[][];
    group: Phaser.Group;

    constructor(width: number, height: number, game: Phaser.Game) {
        this.colors = [];
        for (let x:number = 0; x < width; x++) {
            this.colors[x] = [];
            this.colors[x][0] = BlockColor.DARKGRAY;
        }

        for (let y:number = 0; y < height; y++) {
            this.colors[0][y] = BlockColor.DARKGRAY;
            this.colors[width - 1][y] = BlockColor.DARKGRAY;
        }

        this.group = game.add.group();

        this.group.createMultiple(width * height, BlockColor[BlockColor.WHITE], [0], true);
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.setAll("alpha", 0.5);
        this.group.align(width, height, blockSize, blockSize);
    }

    isValidPosition(points: Phaser.Point[]):boolean {
        return true;
    }
}