/*
 * File: SquareRenderable.js
 *  
 * draws from the square vertex buffer
 */
/*jslint node: true, vars: true */
/*global gEngine, Renderable */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SquareRenderable(shader) {
    Renderable.call(this, shader);
    // Notice how to call the super class constructor!
    // The constructor takes on paramter, but we are calling it with two arguments!
    // First argument says, "this" is the caller of the constructor
}
gEngine.Core.inheritPrototype(SquareRenderable, Renderable);
// This line MUST be defined right after the constructor
// To get all the methods defined in the super-class.prototype


// Ovreride the super-class "draw()" method!
// Changes Made By Stan Huber 11/30 --------------------------
// The method has been modified to accept the range of textures to draw. If the
// range is not specified then all textures contained will be drawn.
SquareRenderable.prototype.draw = function (camera, parentMat, firstText, lastText) {
    if (firstText !== undefined && lastText !== undefined) {
        Renderable.prototype.draw.call(this, firstText, lastText);
    } else {
            Renderable.prototype.draw.call(this);
    }
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(
            gEngine.VertexBuffer.getGLVertexRef(),
            this.mColor, // this is defined in the super class!
            camera.getVPMatrix());  // always activate the shader first!
    this.computeAndLoadModelXform(parentMat);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // should really have a shader-deActivateShader ...
    this.mShader.deactivateShader();
   
    
};
// End Changes ---------------------------------------------------
// The get/set color, and getXform funcitons are inherited