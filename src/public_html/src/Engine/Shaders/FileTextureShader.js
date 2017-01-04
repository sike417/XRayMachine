/* 
 * File: FileTextureShader.js
 *  
 */

/*jslint node: true, vars: true */
/*global gEngine: false, alert: false, XMLHttpRequest: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// constructor of SimpleShader object
function FileTextureShader(vertexShaderPath, fragmentShaderPath) {
    ColorVertexShader.call(this, vertexShaderPath, fragmentShaderPath);
    
    this.mShaderTextureCoordAttribute = null;
    this.mSamplerRef = null;

    var gl = gEngine.Core.getGL();
    this.mSamplerRef = [];
    this.mTextureTransformRef = [];
    for (var i = 0; i<8; i++) {
        this.mSamplerRef.push(
            gl.getUniformLocation(this.mCompiledShader, "uSampler[" + i + "]"));
        this.mTextureTransformRef.push(
            gl.getUniformLocation(this.mCompiledShader, "uTextureTransform[" + i + "]"));
    }
    this.mNumTextures = 0;
    this.mNumTexturesRef = gl.getUniformLocation(this.mCompiledShader, "uNumTextures");
    this.mBlendRef = gl.getUniformLocation(this.mCompiledShader, "uBlendColor");
    this.mShaderTextureCoordAttribute = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
}
// get all the prototype functions from SimpleShader
gEngine.Core.inheritPrototype(FileTextureShader, ColorVertexShader);

FileTextureShader.prototype.setNumTextures = function (n) {
    gEngine.Core.getGL().uniform1i(this.mNumTexturesRef, n);
    this.mNumTextures = n;
};

FileTextureShader.prototype.setTextureTransform = function(n, textureXform) {
    // textuyreXform is a mat3
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix3fv(this.mTextureTransformRef[n], false, textureXform);
};

FileTextureShader.prototype.setBlendColor = function(blend) {
    // textuyreXform is a mat3
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mBlendRef, blend);
};

// Activate the shader for rendering
FileTextureShader.prototype.activateShader = function (buf, pixelColor, vpMatrix) {
    ColorVertexShader.prototype.activateShader.call(this, buf, pixelColor, vpMatrix);
        
    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTexCoordRef());
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    for (var i=0; i<this.mNumTextures; i++)
        gl.uniform1i(this.mSamplerRef[i], i); // <-- binds to texture unit
};

FileTextureShader.prototype.deactivateShader = function (){
    var gl = gEngine.Core.getGL();
    
    if(this.mShaderVertexPositionAttribute !== undefined) {
        gl.disableVertexAttribArray(this.mShaderVertexPositionAttribute);    
    }
    
    if(this.mVertexColorAttribute !== undefined) {
        gl.disableVertexAttribArray(this.mVertexColorAttribute);    
    }
    
    if(this.mShaderTextureCoordAttribute !== undefined) {
        gl.disableVertexAttribArray(this.mShaderTextureCoordAttribute);    
    }
    
    gl.activeTexture(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
};