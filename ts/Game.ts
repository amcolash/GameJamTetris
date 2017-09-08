class SimpleGame {
	game:Phaser.Game;
	grid:Grid;
	currentBlock:Block;

	width:number = 10;
	height:number = 22;
	
	constructor() {
		this.game = new Phaser.Game( 500, 750, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update:this.update } );
	}
	
	preload() {
		Block.preload(this.game);
	}
	
	create() {
		this.grid = new Grid(this.width, this.height, this.game);
	}

	update() {
		if (!this.currentBlock) {
			this.currentBlock = new Block(BlockType.O, new Phaser.Point(this.width / 2, this.height), this.game);
		}
	}

	getInstance() {
		return this.game;
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}