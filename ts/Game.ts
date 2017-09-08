class SimpleGame {
	game:Phaser.Game;
	
	constructor() {
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'content', { preload:this.preload, create:this.create} );
	}
	
	preload() {
		Block.preload(this.game);
	}
	
	create() {
		// add the 'logo' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence
		// var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
		// logo.anchor.setTo( 0.5, 0.5 );
	}

	getInstance() {
		return this.game;
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new SimpleGame();
}