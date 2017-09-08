class Block {
    type: BlockType;
    pos: Phaser.Point;
    rot: number;
    shape: number[][];
    group: Phaser.Group;

    constructor(type: BlockType, pos: Phaser.Point, game: Phaser.Game) {
        this.type = type;
        this.pos = pos;
        this.shape = BlockType.getShape(type);

        // TODO: Group
    }

    update() {
        this.pos.x -= 1;
    }

    move(pos: Phaser.Point) {
        
    }

    rotate() {
        this.rot = (this.rot + 90) % 360;
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