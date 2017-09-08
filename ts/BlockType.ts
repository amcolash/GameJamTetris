enum BlockType {I, J, L, O, S, T, Z}; // http://imgur.com/9Z0oJXe

/**
 * Shapes are based off of 4x4 grid shape
 * 
 * 1  2  3  4
 * 5  6  7  8
 * 9  10 11 12
 * 13 14 15 16
 */
namespace BlockType {
    export function getShape(type: BlockType) {
        let shape: number[][] = [[]];
        switch(type) {
            case BlockType.I:
				shape[1][0]=BlockColor.RED;
				shape[1][1]=BlockColor.RED;
				shape[1][2]=BlockColor.RED;
				shape[1][3]=BlockColor.RED;
		    case BlockType.O:
				shape[1][1]=BlockColor.BLUE;
				shape[1][2]=BlockColor.BLUE;
				shape[2][1]=BlockColor.BLUE;
				shape[2][2]=BlockColor.BLUE;
		    case BlockType.T:
				shape[1][1]=BlockColor.GRAY;
				shape[0][2]=BlockColor.GRAY;
				shape[1][2]=BlockColor.GRAY;
				shape[2][2]=BlockColor.GRAY;
		    case BlockType.S:
				shape[0][1]=BlockColor.ORANGE;
				shape[1][1]=BlockColor.ORANGE;
				shape[1][2]=BlockColor.ORANGE;
				shape[2][2]=BlockColor.ORANGE;
		    case BlockType.Z:
				shape[2][1]=BlockColor.GREEN;
				shape[1][1]=BlockColor.GREEN;
				shape[1][2]=BlockColor.GREEN;
				shape[0][2]=BlockColor.GREEN;
		    case BlockType.J:
				shape[1][1]=BlockColor.LIGHT_BLUE;
				shape[2][1]=BlockColor.LIGHT_BLUE;
				shape[2][2]=BlockColor.LIGHT_BLUE;
				shape[2][3]=BlockColor.LIGHT_BLUE;
		    case BlockType.L:
				shape[2][1]=BlockColor.PURPLE;
				shape[1][1]=BlockColor.PURPLE;
				shape[1][2]=BlockColor.PURPLE;
				shape[1][3]=BlockColor.PURPLE;
        }

        return shape;
    }
}