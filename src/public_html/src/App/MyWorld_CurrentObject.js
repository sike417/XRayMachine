/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global MyWorld, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


MyWorld.prototype.update = function () {
};

MyWorld.prototype.currentObject = function () {
    return this.mCurrentObject;
};

MyWorld.prototype.defineCenter = function (x, y) {
    this.mCurrentObject = new SquareRenderable(this.mFileTextureShader);
    if (this.vmUseRandomColor) {
        this.mCurrentObject.setColor([
            Math.random(), Math.random(), Math.random(), Math.random()]);
        var i;
        for (i = 0; i<4; i++) {
            this.mCurrentObject.setVertexColor(i,
                [Math.random(), Math.random(), Math.random(), Math.random()]);
        }
    }
    // this.mAllObjects.push(this.mCurrentObject);
    var xf = this.mCurrentObject.getXform();
    xf.setXPos(x);
    xf.setYPos(y);
    xf.setSize(2, 2);

    this.mCurrentObject.addFileTexture(this.mFileTexture);
};

// from center to current position is 1/2 of width
MyWorld.prototype.defineWidth = function (x, y) {
    var xf = this.mCurrentObject.getXform();
    var dx = Math.abs(x - xf.getXPos());
    var dy = Math.abs(y - xf.getYPos());
    xf.setSize(dx*2, dy*2);
};

MyWorld.prototype.newFileTexture = function(file, isURL) {
    this.mFileTexture = new FileTextureSupport(file, isURL);
    if (this.mCurrentObject.addFileTexture !== undefined)
        this.mCurrentObject.addFileTexture(this.mFileTexture);
};

MyWorld.prototype.getFileTexture = function() {
    return this.mFileTexture;
};