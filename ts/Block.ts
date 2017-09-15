class Block {
    grid:Grid;
    type: BlockType;
    gridPos: Phaser.Point;
    shape: boolean[][];
    group: Phaser.Group;
    isAlive: boolean;

    static newBlock(game: Phaser.Game, grid: Grid): Block {
        // let blocked:boolean[][] = Block.getBlockedCoordinates(grid);
        // console.log(blocked);

        let type: BlockType = Math.floor(Math.random() * 7);
        let max: Phaser.Rectangle = Block.getDimensions(null, type);

        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.width + 1)), gridHeight + max.height), game, grid);
    }

    constructor(type: BlockType, gridPos?: Phaser.Point, game?: Phaser.Game, grid?: Grid) {
        this.type = type;
        this.grid = grid;
        this.isAlive = true;

        if (gridPos) {
            this.gridPos = gridPos;
        } else {
            this.gridPos = new Phaser.Point();
        }
        
        let baseShape = BlockType.getShape(type);

        // Deep copy of the shape locally
        this.shape = JSON.parse(JSON.stringify(baseShape));
        
        if (game) {
            let color: string = BlockType.getColor(type);
            this.group = game.add.group();

            for(let i:number = 0; i < 4; i++) {
                this.group.create(0, 0, color);
            }
            
            this.group.setAll("width", blockSize);
            this.group.setAll("height", blockSize);
        }
        
        this.updateShape();
    }

    move(x: number, y: number) {
        if (this.moveYPossible(y)) {
            this.gridPos.y += y;

            if (this.moveXPossible(x)) {
                this.gridPos.x += x;
            }
    
            this.updateShape();
        } else {
            this.isAlive = false;
        }
    }

    rotate() {
        if (this.type == BlockType.O) return; // Nothing to do here
        this.shape = RotateMatrix.rotate(this.shape);
        this.updateShape();
    }


    private moveXPossible(x: number): boolean {
        let dim: Phaser.Rectangle = this.getDimensions();
        if ((this.gridPos.x + x) < dim.x) return false;
        if ((this.gridPos.x + x) > gridWidth - dim.width - dim.x) return false;

        return true;
    }

    private moveYPossible(y:number):boolean {
        let dim:Phaser.Rectangle = this.getDimensions();
        if ((this.gridPos.y + y) < dim.height + dim.y) return false;

        return true;
    }

    update() {
        if (this.isAlive) {
            this.move(0, -1);
        }
    }

    private updateShape() {
        if (this.group) {
            let i: number = 0;
            for (let y: number = 0; y < this.shape.length; y++) {
                for (let x: number = 0; x < this.shape[y].length; x++) {
                    if (this.shape[y][x]) {
                        this.group.getChildAt(i).position.set(x * blockSize, y * blockSize);
                        i++;
                    }
                }
            }
            this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
        }
    }

    getDimensions(): Phaser.Rectangle {
        return Block.getDimensions(this.shape);
    }

    // Only valid if we have at least a 1 point in a block (which we do in normal tetris)
	static getDimensions(shape?:boolean[][], type?:BlockType):Phaser.Rectangle {
        if (!shape) {
            shape = BlockType.getShape(type);
        }

        let minX:number = shape.length;
        let maxX:number = 0;
        let minY:number = shape.length;
        let maxY:number = 0;

        for (let y:number = 0; y < shape.length; y++) {
            for (let x:number = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        let dim: Phaser.Rectangle = new Phaser.Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
        return dim;
    }
    
    static getBlockedCoordinates(grid:Grid):boolean[][] {
        let blocked:boolean[][] = [];

        for (let y:number = 0; y < gridHeight; y++) {
            blocked[y] = [];
            for (let x:number = 0; x < gridWidth; x++) {
                blocked[y][x] = false;
            }
        }

        for (let block of grid.deadBlocks) {
            for (let y: number = 0; y < block.shape.length; y++) {
                for (let x: number = 0; x < block.shape[y].length; x++) {
                    if (block.shape[y][x]) {
                        blocked[y][x] = true;
                    }
                }
            }
        }

        return blocked;
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