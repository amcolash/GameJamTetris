class Test {
    public static runTests():boolean {
        let numErrors:number = 0;
        numErrors += Test.runWidthTests();
        numErrors += Test.runHeightTests();

        if (numErrors > 0) {
            console.error("Errors Occured, Killing Game");
            return false;
        }

        return true;
    }

    private static runWidthTests():number {
        let numErrors:number = 0;

        let iDim: Phaser.Rectangle = Block.getDimensions(BlockType.I);
        let oDim: Phaser.Rectangle = Block.getDimensions(BlockType.O);
        let tDim: Phaser.Rectangle = Block.getDimensions(BlockType.T);
        let sDim: Phaser.Rectangle = Block.getDimensions(BlockType.S);
        let zDim: Phaser.Rectangle = Block.getDimensions(BlockType.Z);
        let jDim: Phaser.Rectangle = Block.getDimensions(BlockType.J);
        let lDim: Phaser.Rectangle = Block.getDimensions(BlockType.L);

        numErrors += Test.assert(iDim.width == 1, "Width: I, " + iDim);
        numErrors += Test.assert(oDim.width == 2, "Width: O, " + oDim);
        numErrors += Test.assert(tDim.width == 3, "Width: T, " + tDim);
        numErrors += Test.assert(sDim.width == 3, "Width: S, " + sDim);
        numErrors += Test.assert(zDim.width == 3, "Width: Z, " + zDim);
        numErrors += Test.assert(jDim.width == 3, "Width: J, " + jDim);
        numErrors += Test.assert(lDim.width == 3, "Width: L, " + lDim);
        
        numErrors += Test.assert(iDim.x == 1, "X Offset: I, " + iDim);
        numErrors += Test.assert(oDim.x == 0, "X Offset: O, " + oDim);
        numErrors += Test.assert(tDim.x == 0, "X Offset: T, " + tDim);
        numErrors += Test.assert(sDim.x == 0, "X Offset: S, " + sDim);
        numErrors += Test.assert(zDim.x == 0, "X Offset: Z, " + zDim);
        numErrors += Test.assert(jDim.x == 0, "X Offset: J, " + jDim);
        numErrors += Test.assert(lDim.x == 0, "X Offset: L, " + lDim);
        
        if (numErrors > 0) {
            console.error("Width Tests: " + numErrors + " errors");
        }

        return numErrors;
    }

    private static runHeightTests():number {
        let numErrors: number = 0;

        let iDim: Phaser.Rectangle = Block.getDimensions(BlockType.I);
        let oDim: Phaser.Rectangle = Block.getDimensions(BlockType.O);
        let tDim: Phaser.Rectangle = Block.getDimensions(BlockType.T);
        let sDim: Phaser.Rectangle = Block.getDimensions(BlockType.S);
        let zDim: Phaser.Rectangle = Block.getDimensions(BlockType.Z);
        let jDim: Phaser.Rectangle = Block.getDimensions(BlockType.J);
        let lDim: Phaser.Rectangle = Block.getDimensions(BlockType.L);

        numErrors += Test.assert(iDim.height == 4, "Height: I, " + iDim);
        numErrors += Test.assert(oDim.height == 2, "Height: O, " + oDim);
        numErrors += Test.assert(tDim.height == 2, "Height: T, " + tDim);
        numErrors += Test.assert(sDim.height == 2, "Height: S, " + sDim);
        numErrors += Test.assert(zDim.height == 2, "Height: Z, " + zDim);
        numErrors += Test.assert(jDim.height == 2, "Height: J, " + jDim);
        numErrors += Test.assert(lDim.height == 2, "Height: L, " + lDim);

        numErrors += Test.assert(iDim.y == 0, "Y Offset: I, " + iDim);
        numErrors += Test.assert(oDim.y == 0, "Y Offset: O, " + oDim);
        numErrors += Test.assert(tDim.y == 1, "Y Offset: T, " + tDim);
        numErrors += Test.assert(sDim.y == 1, "Y Offset: S, " + sDim);
        numErrors += Test.assert(zDim.y == 1, "Y Offset: Z, " + zDim);
        numErrors += Test.assert(jDim.y == 1, "Y Offset: J, " + jDim);
        numErrors += Test.assert(lDim.y == 1, "Y Offset: L, " + lDim);

        if (numErrors > 0) {
            console.error("Height Tests: " + numErrors + " errors");
        }

        return numErrors;
    }

    private static assert(condition:boolean, error:string):number {
        if (!condition) console.error(error);

        // Return number of errors
        return condition ? 0 : 1;
    }
}