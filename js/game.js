var Block = /** @class */ (function () {
    function Block(type, pos, game) {
        this.type = type;
        this.pos = pos;
        this.shape = BlockType.getShape(type);
        // TODO: Group
    }
    Block.prototype.update = function () {
        this.pos.x -= 1;
    };
    Block.prototype.move = function (pos) {
    };
    Block.prototype.rotate = function () {
        this.rot = (this.rot + 90) % 360;
    };
    Block.preload = function (game) {
        game.load.image(BlockColor[BlockColor.BLUE], 'img/colorblocks/blue.png');
        game.load.image(BlockColor[BlockColor.DARKGRAY], 'img/colorblocks/darkgray.png');
        game.load.image(BlockColor[BlockColor.GRAY], 'img/colorblocks/gray.png');
        game.load.image(BlockColor[BlockColor.GREEN], 'img/colorblocks/green.png');
        game.load.image(BlockColor[BlockColor.LIGHT_BLUE], 'img/colorblocks/lightblue.png');
        game.load.image(BlockColor[BlockColor.ORANGE], 'img/colorblocks/orange.png');
        game.load.image(BlockColor[BlockColor.PINK], 'img/colorblocks/pink.png');
        game.load.image(BlockColor[BlockColor.PURPLE], 'img/colorblocks/purple.png');
        game.load.image(BlockColor[BlockColor.RED], 'img/colorblocks/red.png');
        game.load.image(BlockColor[BlockColor.RED2], 'img/colorblocks/red2.png');
        game.load.image(BlockColor[BlockColor.WHITE], 'img/colorblocks/white.png');
    };
    return Block;
}());
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["BLUE"] = 0] = "BLUE";
    BlockColor[BlockColor["DARKGRAY"] = 1] = "DARKGRAY";
    BlockColor[BlockColor["GRAY"] = 2] = "GRAY";
    BlockColor[BlockColor["GREEN"] = 3] = "GREEN";
    BlockColor[BlockColor["LIGHT_BLUE"] = 4] = "LIGHT_BLUE";
    BlockColor[BlockColor["ORANGE"] = 5] = "ORANGE";
    BlockColor[BlockColor["PINK"] = 6] = "PINK";
    BlockColor[BlockColor["PURPLE"] = 7] = "PURPLE";
    BlockColor[BlockColor["RED"] = 8] = "RED";
    BlockColor[BlockColor["RED2"] = 9] = "RED2";
    BlockColor[BlockColor["WHITE"] = 10] = "WHITE";
})(BlockColor || (BlockColor = {}));
;
var BlockType;
(function (BlockType) {
    BlockType[BlockType["I"] = 0] = "I";
    BlockType[BlockType["J"] = 1] = "J";
    BlockType[BlockType["L"] = 2] = "L";
    BlockType[BlockType["O"] = 3] = "O";
    BlockType[BlockType["S"] = 4] = "S";
    BlockType[BlockType["T"] = 5] = "T";
    BlockType[BlockType["Z"] = 6] = "Z";
})(BlockType || (BlockType = {}));
; // http://imgur.com/9Z0oJXe
/**
 * Shapes are based off of 4x4 grid shape
 *
 * 1  2  3  4
 * 5  6  7  8
 * 9  10 11 12
 * 13 14 15 16
 */
(function (BlockType) {
    function getShape(type) {
        var shape = [];
        for (var i = 0; i < 4; i++) {
            shape[i] = [];
        }
        switch (type) {
            case BlockType.I:
                shape[1][0] = BlockColor.RED;
                shape[1][1] = BlockColor.RED;
                shape[1][2] = BlockColor.RED;
                shape[1][3] = BlockColor.RED;
            case BlockType.O:
                shape[1][1] = BlockColor.BLUE;
                shape[1][2] = BlockColor.BLUE;
                shape[2][1] = BlockColor.BLUE;
                shape[2][2] = BlockColor.BLUE;
            case BlockType.T:
                shape[1][1] = BlockColor.GRAY;
                shape[0][2] = BlockColor.GRAY;
                shape[1][2] = BlockColor.GRAY;
                shape[2][2] = BlockColor.GRAY;
            case BlockType.S:
                shape[0][1] = BlockColor.ORANGE;
                shape[1][1] = BlockColor.ORANGE;
                shape[1][2] = BlockColor.ORANGE;
                shape[2][2] = BlockColor.ORANGE;
            case BlockType.Z:
                shape[2][1] = BlockColor.GREEN;
                shape[1][1] = BlockColor.GREEN;
                shape[1][2] = BlockColor.GREEN;
                shape[0][2] = BlockColor.GREEN;
            case BlockType.J:
                shape[1][1] = BlockColor.LIGHT_BLUE;
                shape[2][1] = BlockColor.LIGHT_BLUE;
                shape[2][2] = BlockColor.LIGHT_BLUE;
                shape[2][3] = BlockColor.LIGHT_BLUE;
            case BlockType.L:
                shape[2][1] = BlockColor.PURPLE;
                shape[1][1] = BlockColor.PURPLE;
                shape[1][2] = BlockColor.PURPLE;
                shape[1][3] = BlockColor.PURPLE;
        }
        return shape;
    }
    BlockType.getShape = getShape;
})(BlockType || (BlockType = {}));
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.width = 10;
        this.height = 22;
        this.game = new Phaser.Game(500, 750, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        Block.preload(this.game);
    };
    SimpleGame.prototype.create = function () {
        this.grid = new Grid(this.width, this.height, this.game);
    };
    SimpleGame.prototype.update = function () {
        if (!this.currentBlock) {
            this.currentBlock = new Block(BlockType.O, new Phaser.Point(this.width / 2, this.height), this.game);
        }
    };
    SimpleGame.prototype.getInstance = function () {
        return this.game;
    };
    return SimpleGame;
}());
// when the page has finished loading, create our game
window.onload = function () {
    var game = new SimpleGame();
};
var Grid = /** @class */ (function () {
    function Grid(width, height, game) {
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
    return Grid;
}());
//# sourceMappingURL=game.js.map