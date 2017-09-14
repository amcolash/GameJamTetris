var Block = /** @class */ (function () {
    function Block(type, gridPos, game, grid) {
        this.type = type;
        this.gridPos = gridPos;
        this.grid = grid;
        this.isAlive = true;
        var baseShape = BlockType.getShape(type);
        // Deep copy of the shape locally
        this.shape = JSON.parse(JSON.stringify(baseShape));
        var color = BlockType.getColor(type);
        this.group = game.add.group();
        for (var i = 0; i < 4; i++) {
            this.group.create(0, 0, color);
        }
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.updateShape();
    }
    Block.newBlock = function (game, grid) {
        // let blocked:boolean[][] = Block.getBlockedCoordinates(grid);
        // console.log(blocked);
        var type = Math.floor(Math.random() * 7);
        var max = Block.getDimensions(type);
        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.width + 1)), gridHeight + max.height), game, grid);
    };
    Block.prototype.move = function (x, y) {
        if (this.moveYPossible(y)) {
            this.gridPos.y += y;
            if (this.moveXPossible(x)) {
                this.gridPos.x += x;
            }
            this.updateShape();
        }
        else {
            this.isAlive = false;
        }
    };
    Block.prototype.rotate = function () {
        if (this.type == BlockType.O)
            return; // Nothing to do here
        this.shape = RotateMatrix.rotate(this.shape);
        this.updateShape();
    };
    Block.prototype.moveXPossible = function (x) {
        var dim = this.getDimensions();
        if ((this.gridPos.x + x) < dim.x)
            return false;
        if ((this.gridPos.x + x) > gridWidth - dim.width - dim.x)
            return false;
        return true;
    };
    Block.prototype.moveYPossible = function (y) {
        var dim = this.getDimensions();
        if ((this.gridPos.y + y) < dim.height + dim.y)
            return false;
        return true;
    };
    Block.prototype.update = function () {
        if (this.isAlive) {
            this.move(0, -1);
        }
    };
    Block.prototype.updateShape = function () {
        var i = 0;
        for (var y = 0; y < this.shape.length; y++) {
            for (var x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    this.group.getChildAt(i).position.set(x * blockSize, y * blockSize);
                    i++;
                }
            }
        }
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    };
    Block.prototype.getDimensions = function () {
        return Block.getDimensions(this.type);
    };
    // Only valid if we have at least a 1 point in a block (which we do in normal tetris)
    Block.getDimensions = function (type) {
        var shape = BlockType.getShape(type);
        var minX = shape.length;
        var maxX = 0;
        var minY = shape.length;
        var maxY = 0;
        for (var y = 0; y < shape.length; y++) {
            for (var x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }
        var dim = new Phaser.Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
        return dim;
    };
    Block.getBlockedCoordinates = function (grid) {
        var blocked = [];
        for (var y = 0; y < gridHeight; y++) {
            blocked[y] = [];
            for (var x = 0; x < gridWidth; x++) {
                blocked[y][x] = false;
            }
        }
        for (var _i = 0, _a = grid.deadBlocks; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var y = 0; y < block.shape.length; y++) {
                for (var x = 0; x < block.shape[y].length; x++) {
                    if (block.shape[y][x]) {
                        blocked[y][x] = true;
                    }
                }
            }
        }
        return blocked;
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
; // http://imgur.com/9ZfalseoJXe
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
var I_SHAPE = [[false, true, false, false], [false, true, false, false], [false, true, false, false], [false, true, false, false]];
var O_SHAPE = [[true, true], [true, true]];
var T_SHAPE = [[false, false, false,], [false, true, false], [true, true, true]];
var S_SHAPE = [[false, false, false,], [false, true, true], [true, true, false]];
var Z_SHAPE = [[false, false, false,], [true, true, false], [false, true, true]];
var J_SHAPE = [[false, false, false,], [true, false, false], [true, true, true]];
var L_SHAPE = [[false, false, false,], [false, false, true], [true, true, true]];
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
        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(function () { this.currentBlock.move(-1, 0); }, this);
        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(function () { this.currentBlock.move(1, 0); }, this);
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(function () { this.currentBlock.rotate(); }, this);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(function () { this.currentBlock.move(0, -1); }, this);
    };
    SimpleGame.prototype.update = function () {
        if (this.testsFailed)
            return;
        this.nextUpdate -= this.game.time.elapsedMS;
        if (this.nextUpdate <= 0) {
            if (this.currentBlock && this.currentBlock.isAlive) {
                this.currentBlock.update();
            }
            else {
                if (this.currentBlock) {
                    this.grid.deadBlocks.push(this.currentBlock);
                }
                this.currentBlock = Block.newBlock(this.game, this.grid);
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
        this.group = game.add.group();
        this.group.createMultiple(width * height, BlockColor[BlockColor.WHITE], [0], true);
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.setAll("alpha", 0.5);
        this.group.align(width, height, blockSize, blockSize);
        this.deadBlocks = [];
    }
    return Grid;
}());
/* From https://github.com/graemeboy/matrix-rotate, typescript-ified */
var RotateMatrix = /** @class */ (function () {
    function RotateMatrix() {
    }
    RotateMatrix.rotate = function (matrix) {
        // Our rotation algorithm involves two steps, transposing
        // and reversing.
        this.transpose(matrix);
        this.reverseRows(matrix);
        return matrix;
    };
    /**
     * Swap each colum with it's n-i corresponding element
     */
    RotateMatrix.reverseRows = function (matrix) {
        for (var i in matrix) {
            matrix[i] = matrix[i].reverse();
        }
    };
    /**
     * Transpose a 2D matrix
     */
    RotateMatrix.transpose = function (matrix) {
        // For NxN matrix
        var n = matrix[0].length;
        var temp;
        // Walk through columns
        var i;
        var j;
        for (i = 0, j = 0; i < n; i++) {
            j = i;
            // Walk through rows
            while (j < n) {
                if (i !== j) {
                    temp = matrix[i][j];
                    matrix[i][j] = matrix[j][i];
                    matrix[j][i] = temp;
                }
                j++;
            }
        }
    };
    return RotateMatrix;
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
        numErrors += Test.assert(iDim.width == 1, "Width: I, " + iDim);
        numErrors += Test.assert(oDim.width == 2, "Width: O, " + oDim);
        numErrors += Test.assert(tDim.width == 3, "Width: T, " + tDim);
        numErrors += Test.assert(sDim.width == 3, "Width: S, " + sDim);
        numErrors += Test.assert(zDim.width == 3, "Width: Z, " + zDim);
        numErrors += Test.assert(jDim.width == 3, "Width: J, " + jDim);
        numErrors += Test.assert(lDim.width == 3, "Width: L, " + lDim);
        numErrors += Test.assert(iDim.x == 1, "X Offset: I, " + iDim);
        numErrors += Test.assert(oDim.x == 0, "X Offset: O, " + oDim);
        numErrors += Test.assert(tDim.x == 0, "X Offset: T, " + tDim);
        numErrors += Test.assert(sDim.x == 0, "X Offset: S, " + sDim);
        numErrors += Test.assert(zDim.x == 0, "X Offset: Z, " + zDim);
        numErrors += Test.assert(jDim.x == 0, "X Offset: J, " + jDim);
        numErrors += Test.assert(lDim.x == 0, "X Offset: L, " + lDim);
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
        numErrors += Test.assert(iDim.height == 4, "Height: I, " + iDim);
        numErrors += Test.assert(oDim.height == 2, "Height: O, " + oDim);
        numErrors += Test.assert(tDim.height == 2, "Height: T, " + tDim);
        numErrors += Test.assert(sDim.height == 2, "Height: S, " + sDim);
        numErrors += Test.assert(zDim.height == 2, "Height: Z, " + zDim);
        numErrors += Test.assert(jDim.height == 2, "Height: J, " + jDim);
        numErrors += Test.assert(lDim.height == 2, "Height: L, " + lDim);
        numErrors += Test.assert(iDim.y == 0, "Y Offset: I, " + iDim);
        numErrors += Test.assert(oDim.y == 0, "Y Offset: O, " + oDim);
        numErrors += Test.assert(tDim.y == 1, "Y Offset: T, " + tDim);
        numErrors += Test.assert(sDim.y == 1, "Y Offset: S, " + sDim);
        numErrors += Test.assert(zDim.y == 1, "Y Offset: Z, " + zDim);
        numErrors += Test.assert(jDim.y == 1, "Y Offset: J, " + jDim);
        numErrors += Test.assert(lDim.y == 1, "Y Offset: L, " + lDim);
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