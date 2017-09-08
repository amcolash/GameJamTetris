class Grid {
    colors: number[][];
    group: Phaser.Group;

    constructor(width: number, height: number, game: Phaser.Game) {
        for (var x = 0; x < width; x++) {
            this.colors[x][0] = BlockColor.DARKGRAY;
        }

        for (var y = 0; y < height; y++) {
            this.colors[0][y] = BlockColor.DARKGRAY;
            this.colors[width - 1][y] = BlockColor.DARKGRAY;
        }

        this.group = game.add.group();
        
    }
}