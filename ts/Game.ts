const gridWidth:number = 10;
const gridHeight:number = 22;
const blockSize:number = 32;
const timestep:number = 50;

class SimpleGame {
	game:Phaser.Game;
	grid:Grid;
	currentBlock:Block;
	nextUpdate:number;
	
	constructor() {
		this.game = new Phaser.Game( 500, 750, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update:this.update } );
	}
	
	preload() {
		Block.preload(this.game);
	}
	
	create() {
		this.nextUpdate = 0;
		this.grid = new Grid(gridWidth, gridHeight, this.game);
	}

	update() {
		this.nextUpdate -= this.game.time.elapsedMS;
		if (this.nextUpdate <= 0) {
			if (this.currentBlock && this.currentBlock.isAlive()) {
				this.currentBlock.update();
			} else {
				let type:BlockType = Math.floor(Math.random() * 7);
				let max:Phaser.Rectangle = Block.getDimensions(type);
				console.log(BlockType[type])
				console.log(max)

				this.currentBlock = new Block(type, new Phaser.Point(Math.floor(Math.random() * (gridWidth - max.width)), gridHeight + max.height), this.game);
			}

			this.nextUpdate = timestep;
		}
	}

	getInstance():Phaser.Game {
		return this.game;
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}