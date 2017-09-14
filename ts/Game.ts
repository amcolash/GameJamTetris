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

		let left:Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		left.onDown.add(function() { this.currentBlock.move(-1, 0); }, this);

		let right: Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		right.onDown.add(function () { this.currentBlock.move(1, 0); }, this);

		let up: Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		up.onDown.add(function () { this.currentBlock.rotate(); }, this);

		let down: Phaser.Key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		down.onDown.add(function () { this.currentBlock.move(0, -1); }, this);
	}

	update() {
		if (this.testsFailed) return;

		this.nextUpdate -= this.game.time.elapsedMS;
		if (this.nextUpdate <= 0) {
			if (this.currentBlock && this.currentBlock.isAlive) {
				this.currentBlock.update();
			} else {
				if (this.currentBlock) {
					this.grid.deadBlocks.push(this.currentBlock);
				}

				this.currentBlock = Block.newBlock(this.game, this.grid);
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