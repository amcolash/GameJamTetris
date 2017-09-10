class Test {
    static runTests() {
        Test.runWidthTests();
        Test.runHeightTests();
    }

    static runWidthTests() {
        let numErrors:number = 0;

        let iDim: Phaser.Point = Block.getDimensions(BlockType.I);
        let oDim: Phaser.Point = Block.getDimensions(BlockType.O);
        let tDim: Phaser.Point = Block.getDimensions(BlockType.T);
        let sDim: Phaser.Point = Block.getDimensions(BlockType.S);
        let zDim: Phaser.Point = Block.getDimensions(BlockType.Z);
        let jDim: Phaser.Point = Block.getDimensions(BlockType.J);
        let lDim: Phaser.Point = Block.getDimensions(BlockType.L);

        numErrors += Test.assert(iDim.x == 1, "Width: I, " + iDim);
        numErrors += Test.assert(oDim.x == 2, "Width: O, " + oDim);
        numErrors += Test.assert(tDim.x == 3, "Width: T, " + tDim);
        numErrors += Test.assert(sDim.x == 3, "Width: S, " + sDim);
        numErrors += Test.assert(zDim.x == 3, "Width: Z, " + zDim);
        numErrors += Test.assert(jDim.x == 3, "Width: J, " + jDim);
        numErrors += Test.assert(lDim.x == 3, "Width: L, " + lDim);

        if (numErrors > 0) {
            console.error("Width Tests: " + numErrors + " errors");
        } else {
            console.log("Width Tests: Passed");
        }
    }

    static runHeightTests() {
        let numErrors: number = 0;

        let iDim: Phaser.Point = Block.getDimensions(BlockType.I);
        let oDim: Phaser.Point = Block.getDimensions(BlockType.O);
        let tDim: Phaser.Point = Block.getDimensions(BlockType.T);
        let sDim: Phaser.Point = Block.getDimensions(BlockType.S);
        let zDim: Phaser.Point = Block.getDimensions(BlockType.Z);
        let jDim: Phaser.Point = Block.getDimensions(BlockType.J);
        let lDim: Phaser.Point = Block.getDimensions(BlockType.L);

        numErrors += Test.assert(iDim.y == 4, "Height: I, " + iDim);
        numErrors += Test.assert(oDim.y == 2, "Height: O, " + oDim);
        numErrors += Test.assert(tDim.y == 2, "Height: T, " + tDim);
        numErrors += Test.assert(sDim.y == 2, "Height: S, " + sDim);
        numErrors += Test.assert(zDim.y == 2, "Height: Z, " + zDim);
        numErrors += Test.assert(jDim.y == 2, "Height: J, " + jDim);
        numErrors += Test.assert(lDim.y == 2, "Height: L, " + lDim);

        if (numErrors > 0) {
            console.error("Height Tests: " + numErrors + " errors");
        } else {
            console.log("Height Tests: Passed");
        }
    }

    static assert(condition:boolean, error:string):number {
        if (!condition) console.error(error);

        // Return number of errors
        return condition ? 0 : 1;
    }
}