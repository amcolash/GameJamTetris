var Block = /** @class */ (function () {
    function Block(type, gridPos, game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);
        var color = BlockType.getColor(type);
        this.group = game.add.group();
        for (var i = 0; i < 4; i++) {
            this.group.create(0, 0, color);
        }
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.updateShape();
    }
    Block.prototype.isAlive = function () {
        return this.gridPos.y > 4;
    };
    Block.prototype.update = function () {
        if (this.isAlive()) {
            this.move(0, -1);
            this.updateShape();
        }
    };
    Block.prototype.updateShape = function () {
        var i = 0;
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 4; x++) {
                if (this.shape[y][x] == 1) {
                    this.group.getChildAt(i).position.set(x * blockSize, y * blockSize);
                    i++;
                }
            }
        }
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    };
    Block.prototype.move = function (x, y) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    };
    Block.prototype.rotate = function () {
        if (this.type == BlockType.O)
            return; // Nothing to do here
        this.updateShape();
    };
    Block.prototype.getDimensions = function () {
        return Block.getDimensions(this.type);
    };
    Block.newBlock = function (game) {
        var type = Math.floor(Math.random() * 7);
        var max = Block.getDimensions(type);
        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.x + 1)), gridHeight + max.y), game);
    };
    // Only valid if we have at least a 1 point in a block (which we do in normal tetris)
    Block.getDimensions = function (type) {
        var dim = new Phaser.Point();
        var shape = BlockType.getShape(type);
        var minX = 4;
        var maxX = 0;
        var minY = 4;
        var maxY = 0;
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 4; x++) {
                if (shape[y][x] == 1) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }
        dim.x = maxX - minX + 1;
        dim.y = maxY - minY + 1;
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
var I_SHAPE = [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]];
var O_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 0, 0], [1, 1, 0, 0]];
var T_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 0, 0], [1, 1, 1, 0]];
var S_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0]];
var Z_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0]];
var J_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0]];
var L_SHAPE = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0]];
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
        this.testsFailed = !Test.runTests();
        if (this.testsFailed)
            return;
        this.nextUpdate = 0;
        this.grid = new Grid(gridWidth, gridHeight, this.game);
        this.deadBlocks = [];
    };
    SimpleGame.prototype.update = function () {
        if (this.testsFailed)
            return;
        this.nextUpdate -= this.game.time.elapsedMS;
        if (this.nextUpdate <= 0) {
            if (this.currentBlock && this.currentBlock.isAlive()) {
                this.currentBlock.update();
            }
            else {
                if (this.currentBlock) {
                    this.deadBlocks.push(this.currentBlock);
                }
                this.currentBlock = Block.newBlock(this.game);
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
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.runTests = function () {
        var numErrors = 0;
        numErrors += Test.runWidthTests();
        numErrors += Test.runHeightTests();
        if (numErrors > 0) {
            console.error("Errors Occured, Killing Game");
            return false;
        }
        return true;
    };
    Test.runWidthTests = function () {
        var numErrors = 0;
        var iDim = Block.getDimensions(BlockType.I);
        var oDim = Block.getDimensions(BlockType.O);
        var tDim = Block.getDimensions(BlockType.T);
        var sDim = Block.getDimensions(BlockType.S);
        var zDim = Block.getDimensions(BlockType.Z);
        var jDim = Block.getDimensions(BlockType.J);
        var lDim = Block.getDimensions(BlockType.L);
        numErrors += Test.assert(iDim.x == 1, "Width: I, " + iDim);
        numErrors += Test.assert(oDim.x == 2, "Width: O, " + oDim);
        numErrors += Test.assert(tDim.x == 3, "Width: T, " + tDim);
        numErrors += Test.assert(sDim.x == 3, "Width: S, " + sDim);
        numErrors += Test.assert(zDim.x == 3, "Width: Z, " + zDim);
        numErrors += Test.assert(jDim.x == 3, "Width: J, " + jDim);
        numErrors += Test.assert(lDim.x == 3, "Width: L, " + lDim);
        if (numErrors > 0) {
            console.error("Width Tests: " + numErrors + " errors");
        }
        return numErrors;
    };
    Test.runHeightTests = function () {
        var numErrors = 0;
        var iDim = Block.getDimensions(BlockType.I);
        var oDim = Block.getDimensions(BlockType.O);
        var tDim = Block.getDimensions(BlockType.T);
        var sDim = Block.getDimensions(BlockType.S);
        var zDim = Block.getDimensions(BlockType.Z);
        var jDim = Block.getDimensions(BlockType.J);
        var lDim = Block.getDimensions(BlockType.L);
        numErrors += Test.assert(iDim.y == 4, "Height: I, " + iDim);
        numErrors += Test.assert(oDim.y == 2, "Height: O, " + oDim);
        numErrors += Test.assert(tDim.y == 2, "Height: T, " + tDim);
        numErrors += Test.assert(sDim.y == 2, "Height: S, " + sDim);
        numErrors += Test.assert(zDim.y == 2, "Height: Z, " + zDim);
        numErrors += Test.assert(jDim.y == 2, "Height: J, " + jDim);
        numErrors += Test.assert(lDim.y == 2, "Height: L, " + lDim);
        if (numErrors > 0) {
            console.error("Height Tests: " + numErrors + " errors");
        }
        return numErrors;
    };
    Test.assert = function (condition, error) {
        if (!condition)
            console.error(error);
        // Return number of errors
        return condition ? 0 : 1;
    };
    return Test;
}());
//# sourceMappingURL=game.js.map