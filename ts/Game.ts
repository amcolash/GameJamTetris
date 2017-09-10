const gridWidth:number = 10;
const gridHeight:number = 22;
const blockSize:number = 32;
const timestep:number = 50;

class SimpleGame {
	game:Phaser.Game;
	nextUpdate:number;
	testsFailed:boolean;

	grid:Grid;
	currentBlock:Block;
	deadBlocks:Block[];
	
	constructor() {
		this.game = new Phaser.Game( 500, 750, Phaser.AUTO, 'content', { preload:this.preload, create:this.create, update:this.update } );
	}
	
	preload() {
		Block.preload(this.game);
	}
	
	create() {
		this.testsFailed = !Test.runTests();
		if (this.testsFailed) return;

		this.nextUpdate = 0;
		this.grid = new Grid(gridWidth, gridHeight, this.game);
		this.deadBlocks = [];
	}

	update() {
		if (this.testsFailed) return;

		this.nextUpdate -= this.game.time.elapsedMS;
		if (this.nextUpdate <= 0) {
			if (this.currentBlock && this.currentBlock.isAlive()) {
				this.currentBlock.update();
			} else {
				if (this.currentBlock) {
					this.deadBlocks.push(this.currentBlock);
				}

				this.currentBlock = Block.newBlock(this.game);
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