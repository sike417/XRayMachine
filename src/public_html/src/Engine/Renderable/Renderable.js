/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine, Transform, mat4, matrix */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Renderable(shader) {
    this.mShader = shader;         // the shader for shading this object
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
    
    this.mVertexColors = [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 1, 1
    ];
    
    this.mFileTextures = [];
    this.mTextureTransforms = [];
    this.mBlendColor = false;
   
}

Renderable.prototype.setVertexColor = function (i, color) {
    var offset = i * 4;
    var count = 0;
    for (count = 0; count < 4; count++) {
        this.mVertexColors[offset+count] = color[count];
    }
};

Renderable.prototype.addFileTexture = function (f) {
    var pxf = new PivotedTransform();
    this.mFileTextures.push(f);
    this.mTextureTransforms.push(pxf);    
};

Renderable.prototype.getNumTextures = function() {
    return this.mFileTextures.length;
};

Renderable.prototype.getFileTexture = function(n) {
    return this.mFileTextures[n];
};


Renderable.prototype.update = function () {};

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------

// Changes Made by Stan Huber 11/30
/*
 * The draw method for Renderable overridden by subclasses prepares Renderables to
 * be drawn. The method sets the vertex and blend colors of the shader for this 
 * Renderable, activates the specified FileTextures for the current object, 
 * and attaches them to the shader. If either parameter is undefined then all
 * textures will be activated and attached to the shader.
 * @param firstText The index of the Renderable's first texture to be drawn.
 * @param lastText The index of the Renderable's last texture to be drawn.
 */
Renderable.prototype.draw = function (firstText, lastText) {
    if (this.mShader.setVertexColor) 
        this.mShader.setVertexColor(this.mVertexColors);

    if (this.mShader.setTextureTransform) {
        this.mShader.setBlendColor(this.mBlendColor);

        var i = 0;
        var gl = gEngine.Core.getGL();
       
        if (firstText !== undefined && lastText !== undefined) {
            for (i = firstText; i <= lastText; i++) {
                this.mFileTextures[i].activateFileTexture(gl.TEXTURE0 + i);
                this.mShader.setTextureTransform(i, this.mTextureTransforms[i].getXform2d());
            }
        }
        else{
            for (i = 0; i < this.mFileTextures.length; i++) {
                this.mFileTextures[i].activateFileTexture(gl.TEXTURE0 + i);
                this.mShader.setTextureTransform(i, this.mTextureTransforms[i].getXform2d());
            }    
        }
        this.mShader.setNumTextures(i);
    }
};
// End Changes -------------------------------------------------------------

Renderable.prototype.computeAndLoadModelXform = function (parentMat) {
    var m = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(m, parentMat, m);
    this.mShader.loadObjectTransform(m);
};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.getTextureXform = function (n) { return this.mTextureTransforms[n]; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype.setBlendColor = function (b) { this.mBlendColor = b; };
Renderable.prototype.getBlendColor = function () { return this.mBlendColor; };


//--- end of Public Methods
//</editor-fold>