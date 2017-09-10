enum BlockType {I, O, T, S, Z, J, L}; // http://imgur.com/9Z0oJXe
enum BlockColor {BLUE, DARKGRAY, GRAY, GREEN, LIGHT_BLUE, ORANGE, PINK, PURPLE, RED, RED2, WHITE};

const I_COLOR = BlockColor[BlockColor.RED];
const O_COLOR = BlockColor[BlockColor.BLUE];
const T_COLOR = BlockColor[BlockColor.GRAY];
const S_COLOR = BlockColor[BlockColor.ORANGE];
const Z_COLOR = BlockColor[BlockColor.GREEN];
const J_COLOR = BlockColor[BlockColor.PINK];
const L_COLOR = BlockColor[BlockColor.PURPLE];

const I_SHAPE: Phaser.Point[] = [new Phaser.Point(1,0), new Phaser.Point(1,1), new Phaser.Point(1,2), new Phaser.Point(1,3)];
const O_SHAPE: Phaser.Point[] = [new Phaser.Point(1,2), new Phaser.Point(1,3), new Phaser.Point(2,2), new Phaser.Point(2,3)];
const T_SHAPE: Phaser.Point[] = [new Phaser.Point(1,2), new Phaser.Point(0,3), new Phaser.Point(1,3), new Phaser.Point(2,3)];
const S_SHAPE: Phaser.Point[] = [new Phaser.Point(0,2), new Phaser.Point(1,2), new Phaser.Point(1,3), new Phaser.Point(2,3)];
const Z_SHAPE: Phaser.Point[] = [new Phaser.Point(2,2), new Phaser.Point(1,2), new Phaser.Point(1,3), new Phaser.Point(0,3)];
const J_SHAPE: Phaser.Point[] = [new Phaser.Point(1,1), new Phaser.Point(2,1), new Phaser.Point(2,2), new Phaser.Point(2,3)];
const L_SHAPE: Phaser.Point[] = [new Phaser.Point(2,1), new Phaser.Point(1,1), new Phaser.Point(1,2), new Phaser.Point(1,3)];

namespace BlockType {
	export function getColor(type: BlockType):string {
		switch(type) {
			case BlockType.I:
				return I_COLOR;
			case BlockType.O:
				return O_COLOR;
			case BlockType.T:
				return T_COLOR;
			case BlockType.S:
				return S_COLOR;
			case BlockType.Z:
				return Z_COLOR;
			case BlockType.J:
				return J_COLOR;
			case BlockType.L:
				return L_COLOR;
		}
	}

	export function getShape(type: BlockType):Phaser.Point[] {
		switch(type) {
			case BlockType.I:
				return I_SHAPE;
			case BlockType.O:
				return O_SHAPE;
			case BlockType.T:
				return T_SHAPE;
			case BlockType.S:
				return S_SHAPE;
			case BlockType.Z:
				return Z_SHAPE;
			case BlockType.J:
				return J_SHAPE;
			case BlockType.L:
				return L_SHAPE;
		}
	}
}