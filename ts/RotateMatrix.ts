/* From https://github.com/graemeboy/matrix-rotate, typescript-ified */

class RotateMatrix {
	public static rotate(matrix:any[][]):any[][] {
		// Our rotation algorithm involves two steps, transposing
		// and reversing.
		this.transpose(matrix);
		this.reverseRows(matrix);
		return matrix;
	}

	/**
	 * Swap each colum with it's n-i corresponding element
	 */
	private static reverseRows(matrix:any[][]) {
		for (let i in matrix) {
			matrix[i] = matrix[i].reverse();
		}
	}

	/**
	 * Transpose a 2D matrix
	 */
	private static transpose(matrix:any[][]) {
		// For NxN matrix
		let n:number = matrix[0].length;
		let temp:number;

		// Walk through columns
		let i:number;
		let j:number;
		for (i = 0, j = 0; i < n; i++) {
			j = i;
			// Walk through rows
			while (j < n) {
				if (i !== j) {
					temp = matrix[i][j];
					matrix[i][j] = matrix[j][i];
					matrix[j][i] = temp;
				}
				j++;
			}
		}
	}
}