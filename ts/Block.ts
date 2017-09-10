class Block {
    type: BlockType;
    gridPos: Phaser.Point;
    shape: boolean[][];
    group: Phaser.Group;

    constructor(type: BlockType, gridPos: Phaser.Point, game: Phaser.Game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);
        
        let color: string = BlockType.getColor(type);
        this.group = game.add.group();
        for(let x:number = 0; x < this.shape.length; x++) {
            for(let y:number = 0; y < this.shape[x].length; y++) {
                if(this.shape[x][y]) this.group.create(x * blockSize, -y * blockSize, color);
            }
        }

        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);

        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    }

    isAlive():boolean {
        return this.gridPos.y > 1;
    }

    update() {
        if (this.isAlive()) {
            this.move(0, -1);
            this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
        }
    }

    move(x:number, y:number) {
        this.gridPos.x += x;
        this.gridPos.y += y;
    }

    rotate() {
        if (this.type == BlockType.O) return; // Nothing to do here
        
        

        let i:number = 0;
        for(let x:number = 0; x < this.shape.length; x++) {
            for(let y:number = 0; y < this.shape[x].length; y++) {
                if(this.shape[x][y]) this.group.getChildAt(i).position.set(x * blockSize, -y * blockSize);
            }
        }
    }

    getDimensions():Phaser.Point {
        return Block.getDimensions(this.type);
    }

    static newBlock(game:Phaser.Game):Block {
        let type:BlockType = Math.floor(Math.random() * 7);
        let max:Phaser.Point = Block.getDimensions(type);

        return new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.x + 1)), gridHeight + max.y), game);
    }

	static getDimensions(type: BlockType):Phaser.Point {
        let dim:Phaser.Point = new Phaser.Point();
        let shape:boolean[][] = BlockType.getShape(type);

        dim.x = shape.length;
        for(let x:number = 0; x < shape.length; x++) {
            let height:number = 0;
            for (let y:number = 0; y < shape[x].length; y++) {
                if (shape[x][y]) height++;
            }
            dim.y = Math.max(dim.y, height);
        }

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