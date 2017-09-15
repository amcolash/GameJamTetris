class Test {
    public static runTests():boolean {
        let numErrors:number = 0;
        numErrors += Test.runWidthTests();
        numErrors += Test.runHeightTests();

        if (numErrors > 0) {
            console.error("Errors Occured, Killing Game");
            return false;
        }

        console.log("All tests passed!");
        return true;
    }

    private static runWidthTests():number {
        let numErrors:number = 0;

        let iBlock:Block = new Block(BlockType.I, new Phaser.Point(gridWidth / 2, gridHeight));
        let oBlock:Block = new Block(BlockType.O, new Phaser.Point(gridWidth / 2, gridHeight));
        let tBlock:Block = new Block(BlockType.T, new Phaser.Point(gridWidth / 2, gridHeight));
        let sBlock:Block = new Block(BlockType.S, new Phaser.Point(gridWidth / 2, gridHeight));
        let zBlock:Block = new Block(BlockType.Z, new Phaser.Point(gridWidth / 2, gridHeight));
        let jBlock:Block = new Block(BlockType.J, new Phaser.Point(gridWidth / 2, gridHeight));
        let lBlock:Block = new Block(BlockType.L, new Phaser.Point(gridWidth / 2, gridHeight));

        let iDim:Phaser.Rectangle = iBlock.getDimensions();
        let oDim:Phaser.Rectangle = oBlock.getDimensions();
        let tDim:Phaser.Rectangle = tBlock.getDimensions();
        let sDim:Phaser.Rectangle = sBlock.getDimensions();
        let zDim:Phaser.Rectangle = zBlock.getDimensions();
        let jDim:Phaser.Rectangle = jBlock.getDimensions();
        let lDim:Phaser.Rectangle = lBlock.getDimensions();

        numErrors += Test.assert(iDim.width == 1, "Width:I, " + iDim);
        numErrors += Test.assert(oDim.width == 2, "Width:O, " + oDim);
        numErrors += Test.assert(tDim.width == 3, "Width:T, " + tDim);
        numErrors += Test.assert(sDim.width == 3, "Width:S, " + sDim);
        numErrors += Test.assert(zDim.width == 3, "Width:Z, " + zDim);
        numErrors += Test.assert(jDim.width == 3, "Width:J, " + jDim);
        numErrors += Test.assert(lDim.width == 3, "Width:L, " + lDim);
        
        numErrors += Test.assert(iDim.x == 1, "X Offset:I, " + iDim);
        numErrors += Test.assert(oDim.x == 0, "X Offset:O, " + oDim);
        numErrors += Test.assert(tDim.x == 0, "X Offset:T, " + tDim);
        numErrors += Test.assert(sDim.x == 0, "X Offset:S, " + sDim);
        numErrors += Test.assert(zDim.x == 0, "X Offset:Z, " + zDim);
        numErrors += Test.assert(jDim.x == 0, "X Offset:J, " + jDim);
        numErrors += Test.assert(lDim.x == 0, "X Offset:L, " + lDim);
        
        // Test rotation of 90 degrees
        iBlock.rotate();
        oBlock.rotate();
        tBlock.rotate();
        sBlock.rotate();
        zBlock.rotate();
        jBlock.rotate();
        lBlock.rotate();

        iDim = iBlock.getDimensions();
        oDim = oBlock.getDimensions();
        tDim = tBlock.getDimensions();
        sDim = sBlock.getDimensions();
        zDim = zBlock.getDimensions();
        jDim = jBlock.getDimensions();
        lDim = lBlock.getDimensions();

        numErrors += Test.assert(iDim.width == 4, "Width:I (rotated), " + iDim);
        numErrors += Test.assert(oDim.width == 2, "Width:O (rotated), " + oDim);
        numErrors += Test.assert(tDim.width == 2, "Width:T (rotated), " + tDim);
        numErrors += Test.assert(sDim.width == 2, "Width:S (rotated), " + sDim);
        numErrors += Test.assert(zDim.width == 2, "Width:Z (rotated), " + zDim);
        numErrors += Test.assert(jDim.width == 2, "Width:J (rotated), " + jDim);
        numErrors += Test.assert(lDim.width == 2, "Width:L (rotated), " + lDim);

        numErrors += Test.assert(iDim.x == 0, "X Offset:I (rotated), " + iDim);
        numErrors += Test.assert(oDim.x == 0, "X Offset:O (rotated), " + oDim);
        numErrors += Test.assert(tDim.x == 0, "X Offset:T (rotated), " + tDim);
        numErrors += Test.assert(sDim.x == 0, "X Offset:S (rotated), " + sDim);
        numErrors += Test.assert(zDim.x == 0, "X Offset:Z (rotated), " + zDim);
        numErrors += Test.assert(jDim.x == 0, "X Offset:J (rotated), " + jDim);
        numErrors += Test.assert(lDim.x == 0, "X Offset:L (rotated), " + lDim);

        if (numErrors > 0) {
            console.error("Width Tests:" + numErrors + " errors");
        }

        return numErrors;
    }

    private static runHeightTests():number {
        let numErrors:number = 0;

        let iBlock:Block = new Block(BlockType.I, new Phaser.Point(gridWidth / 2, gridHeight));
        let oBlock:Block = new Block(BlockType.O, new Phaser.Point(gridWidth / 2, gridHeight));
        let tBlock:Block = new Block(BlockType.T, new Phaser.Point(gridWidth / 2, gridHeight));
        let sBlock:Block = new Block(BlockType.S, new Phaser.Point(gridWidth / 2, gridHeight));
        let zBlock:Block = new Block(BlockType.Z, new Phaser.Point(gridWidth / 2, gridHeight));
        let jBlock:Block = new Block(BlockType.J, new Phaser.Point(gridWidth / 2, gridHeight));
        let lBlock:Block = new Block(BlockType.L, new Phaser.Point(gridWidth / 2, gridHeight));

        let iDim:Phaser.Rectangle = iBlock.getDimensions();
        let oDim:Phaser.Rectangle = oBlock.getDimensions();
        let tDim:Phaser.Rectangle = tBlock.getDimensions();
        let sDim:Phaser.Rectangle = sBlock.getDimensions();
        let zDim:Phaser.Rectangle = zBlock.getDimensions();
        let jDim:Phaser.Rectangle = jBlock.getDimensions();
        let lDim:Phaser.Rectangle = lBlock.getDimensions();

        numErrors += Test.assert(iDim.height == 4, "Height:I, " + iDim);
        numErrors += Test.assert(oDim.height == 2, "Height:O, " + oDim);
        numErrors += Test.assert(tDim.height == 2, "Height:T, " + tDim);
        numErrors += Test.assert(sDim.height == 2, "Height:S, " + sDim);
        numErrors += Test.assert(zDim.height == 2, "Height:Z, " + zDim);
        numErrors += Test.assert(jDim.height == 2, "Height:J, " + jDim);
        numErrors += Test.assert(lDim.height == 2, "Height:L, " + lDim);

        numErrors += Test.assert(iDim.y == 0, "Y Offset:I, " + iDim);
        numErrors += Test.assert(oDim.y == 0, "Y Offset:O, " + oDim);
        numErrors += Test.assert(tDim.y == 1, "Y Offset:T, " + tDim);
        numErrors += Test.assert(sDim.y == 1, "Y Offset:S, " + sDim);
        numErrors += Test.assert(zDim.y == 1, "Y Offset:Z, " + zDim);
        numErrors += Test.assert(jDim.y == 1, "Y Offset:J, " + jDim);
        numErrors += Test.assert(lDim.y == 1, "Y Offset:L, " + lDim);

        // Test rotation of 90 degrees
        iBlock.rotate();
        oBlock.rotate();
        tBlock.rotate();
        sBlock.rotate();
        zBlock.rotate();
        jBlock.rotate();
        lBlock.rotate();

        iDim = iBlock.getDimensions();
        oDim = oBlock.getDimensions();
        tDim = tBlock.getDimensions();
        sDim = sBlock.getDimensions();
        zDim = zBlock.getDimensions();
        jDim = jBlock.getDimensions();
        lDim = lBlock.getDimensions();

        numErrors += Test.assert(iDim.height == 1, "Height:I (rotated), " + iDim);
        numErrors += Test.assert(oDim.height == 2, "Height:O (rotated), " + oDim);
        numErrors += Test.assert(tDim.height == 3, "Height:T (rotated), " + tDim);
        numErrors += Test.assert(sDim.height == 3, "Height:S (rotated), " + sDim);
        numErrors += Test.assert(zDim.height == 3, "Height:Z (rotated), " + zDim);
        numErrors += Test.assert(jDim.height == 3, "Height:J (rotated), " + jDim);
        numErrors += Test.assert(lDim.height == 3, "Height:L (rotated), " + lDim);

        numErrors += Test.assert(iDim.y == 1, "Y Offset:I (rotated), " + iDim);
        numErrors += Test.assert(oDim.y == 0, "Y Offset:O (rotated), " + oDim);
        numErrors += Test.assert(tDim.y == 0, "Y Offset:T (rotated), " + tDim);
        numErrors += Test.assert(sDim.y == 0, "Y Offset:S (rotated), " + sDim);
        numErrors += Test.assert(zDim.y == 0, "Y Offset:Z (rotated), " + zDim);
        numErrors += Test.assert(jDim.y == 0, "Y Offset:J (rotated), " + jDim);
        numErrors += Test.assert(lDim.y == 0, "Y Offset:L (rotated), " + lDim);

        if (numErrors > 0) {
            console.error("Height Tests:" + numErrors + " errors");
        }

        return numErrors;
    }

    private static assert(condition:boolean, error:string):number {
        if (!condition) console.error(error);

        // Return number of errors
        return condition ? 0 :1;
    }
}