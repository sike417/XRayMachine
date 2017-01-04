/* File: SceneNode.js 
 *
 * Support for grouping of Renderables with custom pivot ability
 */

/*jslint node: true, vars: true */
/*global PivotedTransform, SquareRenderable  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function SceneNode(shader, name, drawPivot) {
    this.mName = name;
    this.mSet = [];
    this.mChildren = [];
    this.mXform = new PivotedTransform();

    // this is for debugging only: for drawing the pivot position
    this.mPivotPos = null;
    if (drawPivot !== undefined && drawPivot !== false) {
        this.mPivotPos = new SquareRenderable(shader);
        this.mPivotPos.setColor([1, 0, 0, 1]); // default color
        var xf = this.mPivotPos.getXform();
        xf.setSize(5.2, 5.2); // always this size
    }
}
SceneNode.prototype.setName = function (n) {
    this.mName = n;
};
SceneNode.prototype.getName = function () {
    return this.mName;
};

SceneNode.prototype.getXform = function () {
    return this.mXform;
};

SceneNode.prototype.size = function () {
    return this.mSet.length;
};

SceneNode.prototype.getRenderableAt = function (index) {
    return this.mSet[index];
};

SceneNode.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};
SceneNode.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};
SceneNode.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

// support children opeations
SceneNode.prototype.addAsChild = function (node) {
    this.mChildren.push(node);
};
SceneNode.prototype.removeChild = function (node) {
    var index = this.mChildren.indexOf(node);
    if (index > -1)
        this.mChildren.splice(index, 1);
};
SceneNode.prototype.getChildAt = function (index) {
    return this.mChildren[index];
};
// Changes Made By Stan Huber 11/30 -----------------------
/*
 * The draw method draws all Renderables for the current SceneNode and all children
 * SceneNodes into the given camera. The Renderables are drawn with the given 
 * range of textures activated.
 * @param {Camera} aCamera The Camera used for drawing all Renderables.
 * @param {int} firstText The index of the first texture to activate for each 
 * Renderable drawn.
 * @param {int} lastText The index of the last texture to activate for each 
 * Renderable drawn.
 * @param {mat4} parentMat The parent matrix of the current SceneNode. If the 
 * parameter is undefined each Renderable in the current SceneNode will only
 * be transformed by their own transform and the current SceneNode's transform.
 * 
 */
SceneNode.prototype.draw = function (aCamera, firstText, lastText, parentMat) {
    var i;
    var xfMat = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(xfMat, parentMat, xfMat);
    // Draw our own!
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera, xfMat, firstText, lastText); // pass to each renderable
    }

    if (firstText !== undefined && lastText !== undefined) {
        // now draw the children
        for (i = 0; i < this.mChildren.length; i++) {
            this.mChildren[i].draw(aCamera, firstText, lastText, xfMat); // pass to each child scenenode
        }
    } else {
        for (i = 0; i < this.mChildren.length; i++) {
            this.mChildren[i].drawAll(aCamera, xfMat); // pass to each child scenenode
        }
    }

    // for debugging, let's draw the pivot position
    if (this.mPivotPos !== null) {
        var pxf = this.getXform();
        var t = pxf.getPosition();
        var p = pxf.getPivot();
        var xf = this.mPivotPos.getXform();
        xf.setPosition(p[0] + t[0], p[1] + t[1]);
        this.mPivotPos.draw(aCamera, parentMat);
    }
};

/*
 * The drawAll method draws all Renderables for the current SceneNode and all 
 * children SceneNodes in the given camera. All Renderables are drawn with all
 * textures they contain. If the current SceneNode has a pivot position, then
 * the pivot is drawn. This method will be called by the draw method if draw is
 * called without the first and last texture index parameters defined.
 * @param cam The camera used for drawing all Renderables.
 * @param parentMat The parent matrix for the current SceneNode. If this parameter
 * is not defined, then all Renderables are only affected by the current SceneNode's
 * transform.
 */
SceneNode.prototype.drawAll = function (cam, parentMat) {
    var i;
    var xfMat = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(xfMat, parentMat, xfMat);

    // Draw our own!
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(cam, xfMat); // pass to each renderable
    }

    for (i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].drawAll(cam, xfMat); // pass to each child scenenode
    }


    // for debugging, let's draw the pivot position
    if (this.mPivotPos !== null) {
        var pxf = this.getXform();
        var t = pxf.getPosition();
        var p = pxf.getPivot();
        var xf = this.mPivotPos.getXform();
        xf.setPosition(p[0] + t[0], p[1] + t[1]);
        this.mPivotPos.draw(cam, parentMat);
    }
};

// End Changes -------------------------------------------------------------

// SceneNode.prototype.count = function()
// {
//
// };
//
// SceneNode.prototype.countNodes = function()
// {
//
// };
