var Block = /** @class */ (function () {
    function Block(type, gridPos, game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);
        var color = BlockType.getColor(type);
        this.group = game.add.group();
        for (var x = 0; x < this.shape.length; x++) {
            for (var y = 0; y < this.shape[x].length; y++) {
                if (this.shape[x][y])
                    this.group.create(x * blockSize, -y * blockSize, color);
            }
        }
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    }
    Block.prototype.isAlive = function () {
        return this.gridPos.y > 1;
    };
    Block.prototype.update = function () {
        if (this.isAlive()) {
            this.move(0, -1);
            this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
        }
    };
    Block.prototype.move = function (x, y) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    };
    Block.prototype.rotate = function () {
        if (this.type == BlockType.O)
            return; // Nothing to do here
        this.group.rotation = (this.group.rotation + Math.PI / 2) % (Math.PI * 2);
    };
    Block.prototype.getDimensions = function () {
        return Block.getDimensions(this.type);
    };
    Block.newBlock = function (game) {
        var type = Math.floor(Math.random() * 7);
        var max = Block.getDimensions(type);
        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.x + 1)), gridHeight + max.y), game);
    };
    Block.getDimensions = function (type) {
        var dim = new Phaser.Point();
        var shape = BlockType.getShape(type);
        dim.x = shape.length;
        for (var x = 0; x < shape.length; x++) {
            var height = 0;
            for (var y = 0; y < shape[x].length; y++) {
                if (shape[x][y])
                    height++;
            }
            dim.y = Math.max(dim.y, height);
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
var I_SHAPE = [[true, true, true, true]];
var O_SHAPE = [[true, true], [true, true]];
var T_SHAPE = [[true], [true, true], [true]];
var S_SHAPE = [[true], [true, true], [false, true]];
var Z_SHAPE = [[false, true], [true, true], [true]];
var J_SHAPE = [[true, true], [true], [true]];
var L_SHAPE = [[true], [true], [true, true]];
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
        Test.runDimensionTest();
    };
    SimpleGame.prototype.create = function () {
        this.nextUpdate = 0;
        this.grid = new Grid(gridWidth, gridHeight, this.game);
        this.deadBlocks = [];
        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(function () { this.currentBlock.move(-1, 0); }, this);
        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(function () { this.currentBlock.move(1, 0); }, this);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down.onDown.add(function () { this.currentBlock.move(0, -1); }, this);
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up.onDown.add(function () { this.currentBlock.rotate(); }, this);
    };
    SimpleGame.prototype.update = function () {
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
    Test.runDimensionTest = function () {
        var i = Block.getDimensions(BlockType.I);
        var o = Block.getDimensions(BlockType.O);
        var t = Block.getDimensions(BlockType.T);
        var s = Block.getDimensions(BlockType.S);
        var z = Block.getDimensions(BlockType.Z);
        var j = Block.getDimensions(BlockType.J);
        var l = Block.getDimensions(BlockType.L);
        // console.log("I" + i);
        // console.log("O" + o);
        // console.log("T" + t);
        // console.log("S" + s);
        // console.log("Z" + z);
        // console.log("J" + j);
        // console.log("L" + l);
        Test.assert(i.x == 1, "I width");
        Test.assert(o.x == 2, "O width");
        Test.assert(t.x == 3, "T width");
        Test.assert(s.x == 3, "S width");
        Test.assert(z.x == 3, "Z width");
        Test.assert(j.x == 3, "J width");
        Test.assert(l.x == 3, "L width");
        Test.assert(i.y == 4, "I height");
        Test.assert(o.y == 2, "O height");
        Test.assert(t.y == 2, "T height");
        Test.assert(s.y == 2, "S height");
        Test.assert(z.y == 2, "Z height");
        Test.assert(j.y == 2, "J height");
        Test.assert(l.y == 2, "L height");
    };
    Test.assert = function (condition, test) {
        if (!condition)
            console.error(test);
    };
    return Test;
}());
//# sourceMappingURL=game.js.map