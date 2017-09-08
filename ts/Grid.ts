class Grid {
    colors: number[][];
    group: Phaser.Group;

    constructor(width: number, height: number, game: Phaser.Game) {
        this.colors = [];
        for (var x = 0; x < width; x++) {
            this.colors[x] = [];
        }

        for (var x = 0; x < width; x++) {
            this.colors[x][0] = BlockColor.DARKGRAY;
        }

        for (var y = 0; y < height; y++) {
            this.colors[0][y] = BlockColor.DARKGRAY;
            this.colors[width - 1][y] = BlockColor.DARKGRAY;
        }

        this.group = game.add.group();

        this.group.createMultiple(width * height, BlockColor[BlockColor.WHITE], [0], true);
        this.group.setAll("width", 32);
        this.group.setAll("height", 32);
        this.group.setAll("alpha", 0.5);
        this.group.align(width, height, 32, 32);
    }
}