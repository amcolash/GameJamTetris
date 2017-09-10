class Block {
    type: BlockType;
    gridPos: Phaser.Point;
    shape: Phaser.Point[];
    group: Phaser.Group;

    constructor(type: BlockType, gridPos: Phaser.Point, game: Phaser.Game) {
        this.type = type;
        this.gridPos = gridPos;
        this.shape = BlockType.getShape(type);

        this.group = game.add.group();
        
        let color: string = BlockType.getColor(type);
        for (let i:number = 0; i < 4; i++) {
            this.group.create(this.shape[i].x * blockSize, this.shape[i].y * blockSize, color);
        }
        this.group.setAll("width", blockSize);
        this.group.setAll("height", blockSize);

        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
    }

    isAlive():boolean {
        return this.gridPos.y > 3;
    }

    update() {
        this.gridPos.y -= 1;
        this.group.position.set(this.gridPos.x * blockSize, (gridHeight - this.gridPos.y) * blockSize);
        
        if (!this.isAlive()) {
            this.group.destroy();
        }
    }

    move(pos: Phaser.Point) {
        // TODO
    }

    rotate() {
        this.group.rotation = (this.group.rotation + 90) % 360;
    }

    getDimensions():Phaser.Rectangle {
        return Block.getDimensions(this.type);
    }

	static getDimensions(type: BlockType):Phaser.Rectangle {
		let shape:Phaser.Point[] = BlockType.getShape(type);
		let dim:Phaser.Rectangle = new Phaser.Rectangle(0,0,0,0);

        // Invert y value
        dim.y = 3;
		for (let i:number = 0; i < 4; i++) {
			dim.x = Math.min(dim.x, shape[i].x);
			dim.y = Math.min(dim.y, shape[i].y);

			dim.width = Math.max(dim.width, shape[i].x - dim.x + 1);
			dim.height = Math.max(dim.height, shape[i].y - dim.y + 1);
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