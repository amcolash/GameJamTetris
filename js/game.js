var Block = /** @class */ (function () {
    function Block(type, gridPos, game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);
        this.group = game.add.group();
        var color = BlockType.getColor(type);
        for (var i = 0; i < 4; i++) {
            this.group.create(this.shape[i].x * blockSize, this.shape[i].y * blockSize, color);
        }
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    }
    Block.prototype.isAlive = function () {
        return this.gridPos.y > 3;
    };
    Block.prototype.update = function () {
        this.gridPos.y -= 1;
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
        if (!this.isAlive()) {
            this.group.destroy();
        }
    };
    Block.prototype.move = function (pos) {
        // TODO
    };
    Block.prototype.rotate = function () {
        this.group.rotation = (this.group.rotation + 90) % 360;
    };
    Block.prototype.getDimensions = function () {
        return Block.getDimensions(this.type);
    };
    Block.getDimensions = function (type) {
        var shape = BlockType.getShape(type);
        var dim = new Phaser.Rectangle(0, 0, 0, 0);
        // Invert y value
        dim.y = 3;
        for (var i = 0; i < 4; i++) {
            dim.x = Math.min(dim.x, shape[i].x);
            dim.y = Math.min(dim.y, shape[i].y);
            dim.width = Math.max(dim.width, shape[i].x - dim.x + 1);
            dim.height = Math.max(dim.height, shape[i].y - dim.y + 1);
        }
        return dim;
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
var BlockType;
(function (BlockType) {
    BlockType[BlockType["I"] = 0] = "I";
    BlockType[BlockType["O"] = 1] = "O";
    BlockType[BlockType["T"] = 2] = "T";
    BlockType[BlockType["S"] = 3] = "S";
    BlockType[BlockType["Z"] = 4] = "Z";
    BlockType[BlockType["J"] = 5] = "J";
    BlockType[BlockType["L"] = 6] = "L";
})(BlockType || (BlockType = {}));
; // http://imgur.com/9Z0oJXe
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
var I_COLOR = BlockColor[BlockColor.RED];
var O_COLOR = BlockColor[BlockColor.BLUE];
var T_COLOR = BlockColor[BlockColor.GRAY];
var S_COLOR = BlockColor[BlockColor.ORANGE];
var Z_COLOR = BlockColor[BlockColor.GREEN];
var J_COLOR = BlockColor[BlockColor.PINK];
var L_COLOR = BlockColor[BlockColor.PURPLE];
var I_SHAPE = [new Phaser.Point(1, 0), new Phaser.Point(1, 1), new Phaser.Point(1, 2), new Phaser.Point(1, 3)];
var O_SHAPE = [new Phaser.Point(1, 2), new Phaser.Point(1, 3), new Phaser.Point(2, 2), new Phaser.Point(2, 3)];
var T_SHAPE = [new Phaser.Point(1, 2), new Phaser.Point(0, 3), new Phaser.Point(1, 3), new Phaser.Point(2, 3)];
var S_SHAPE = [new Phaser.Point(0, 2), new Phaser.Point(1, 2), new Phaser.Point(1, 3), new Phaser.Point(2, 3)];
var Z_SHAPE = [new Phaser.Point(2, 2), new Phaser.Point(1, 2), new Phaser.Point(1, 3), new Phaser.Point(0, 3)];
var J_SHAPE = [new Phaser.Point(1, 1), new Phaser.Point(2, 1), new Phaser.Point(2, 2), new Phaser.Point(2, 3)];
var L_SHAPE = [new Phaser.Point(2, 1), new Phaser.Point(1, 1), new Phaser.Point(1, 2), new Phaser.Point(1, 3)];
(function (BlockType) {
    function getColor(type) {
        switch (type) {
            case BlockType.I:
                return I_COLOR;
            case BlockType.O:
                return O_COLOR;
            case BlockType.T:
                return T_COLOR;
            case BlockType.S:
                return S_COLOR;
            case BlockType.Z:
                return Z_COLOR;
            case BlockType.J:
                return J_COLOR;
            case BlockType.L:
                return L_COLOR;
        }
    }
    BlockType.getColor = getColor;
    function getShape(type) {
        switch (type) {
            case BlockType.I:
                return I_SHAPE;
            case BlockType.O:
                return O_SHAPE;
            case BlockType.T:
                return T_SHAPE;
            case BlockType.S:
                return S_SHAPE;
            case BlockType.Z:
                return Z_SHAPE;
            case BlockType.J:
                return J_SHAPE;
            case BlockType.L:
                return L_SHAPE;
        }
    }
    BlockType.getShape = getShape;
})(BlockType || (BlockType = {}));
var gridWidth = 10;
var gridHeight = 22;
var blockSize = 32;
var timestep = 50;
var SimpleGame = /** @class */ (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(500, 750, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        Block.preload(this.game);
    };
    SimpleGame.prototype.create = function () {
        this.nextUpdate = 0;
        this.grid = new Grid(gridWidth, gridHeight, this.game);
    };
    SimpleGame.prototype.update = function () {
        this.nextUpdate -= this.game.time.elapsedMS;
        if (this.nextUpdate <= 0) {
            if (this.currentBlock && this.currentBlock.isAlive()) {
                this.currentBlock.update();
            }
            else {
                var type = Math.floor(Math.random() * 7);
                var max = Block.getDimensions(type);
                console.log(BlockType[type]);
                console.log(max);
                this.currentBlock = new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.width)), gridHeight + max.height), this.game);
            }
            this.nextUpdate = timestep;
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
            this.colors[x][0] = BlockColor.DARKGRAY;
        }
        for (var y = 0; y < height; y++) {
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
    Grid.prototype.isValidPosition = function (points) {
        return true;
    };
    return Grid;
}());
//# sourceMappingURL=game.js.map