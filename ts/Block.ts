class Block {
    type: BlockType;
    gridPos: Phaser.Point;
    shape: number[][];
    group: Phaser.Group;

    constructor(type: BlockType, gridPos: Phaser.Point, game: Phaser.Game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);
        
        let color: string = BlockType.getColor(type);
        this.group = game.add.group();

        for(let i:number = 0; i < 4; i++) {
            this.group.create(0, 0, color);
        }
        
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);
        
        this.updateShape();
    }

    isAlive():boolean {
        return this.gridPos.y > 4;
    }

    update() {
        if (this.isAlive()) {
            this.move(0, -1);
            this.updateShape();
        }
    }

    updateShape() {
        let i: number = 0;
        for (let y: number = 0; y < 4; y++) {
            for (let x: number = 0; x < 4; x++) {
                if (this.shape[y][x] == 1) {
                    this.group.getChildAt(i).position.set(x * blockSize, y * blockSize);
                    i++;
                }
            }
        }

        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    }

    move(x:number, y:number) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    }

    rotate() {
        if (this.type == BlockType.O) return; // Nothing to do here

        
        this.updateShape();
    }

    getDimensions():Phaser.Point {
        return Block.getDimensions(this.type);
    }

    static newBlock(game:Phaser.Game):Block {
        let type:BlockType = Math.floor(Math.random() * 7);
        let max:Phaser.Point = Block.getDimensions(type);

        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.x + 1)), gridHeight + max.y), game);
    }

    // Only valid if we have at least a 1 point in a block (which we do in normal tetris)
	static getDimensions(type: BlockType):Phaser.Point {
        let dim:Phaser.Point = new Phaser.Point();
        let shape:number[][] = BlockType.getShape(type);

        let minX:number = 4;
        let maxX:number = 0;
        let minY:number = 4;
        let maxY:number = 0;

        for (let y:number = 0; y < 4; y++) {
            for (let x:number = 0; x < 4; x++) {
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
	}

    static preload(game: Phaser.Game) {
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
    }
    
}