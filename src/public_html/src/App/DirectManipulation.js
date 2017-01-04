/**
 * Created by jayse on 11/14/16.
 */
/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DirectManipulation(shader, name, xPivot, yPivot, pivotPosition)
{
    SceneNode.call(this, shader, name, false);   // calling super class constructor
    var prime = this.getXform();
    prime.setPivot(pivotPosition[0], pivotPosition[1]);

    //var obj = new SquareRenderable(shader);  // The black vertical
    //this.addToSet(obj);
    //obj.setColor([0, 0, 0, 1]);
    //var xf = obj.getXform();
    //xf.setSize(.1, 2.75);
    //xf.setPosition(xPivot, yPivot + xf.getHeight() / 2);

    var obj = new SquareRenderable(shader);  // The black horizontal
    var xf = obj.getXform();
    this.addToSet(obj);
    obj.setColor([0, 0, 0, 1]);
    xf = obj.getXform();
    xf.setSize(2.75, .1);
    xf.setPosition(xPivot + xf.getWidth() / 2, yPivot + xf.getHeight() / 2);

    //obj = new SquareRenderable(shader);  // The yellow
    //this.addToSet(obj);
    //obj.setColor([1, 1, 0, 1]);
    //xf = obj.getXform();
    //xf.setSize(.35, .25);
    //xf.setPosition(xPivot, yPivot + prime.getHeight() * 2.7);

    obj = new SquareRenderable(shader);  // The pink
    this.addToSet(obj);
    obj.setColor([1, .2, 1, 1]);
    xf = obj.getXform();
    xf.setSize(.25, .35);
    xf.setPosition(xPivot + prime.getHeight() * 2.7, yPivot + xf.getWidth() / 4);

    obj = new SquareRenderable(shader);  // The purple
    this.addToSet(obj);
    obj.setColor([1,.25,.5, 1]);
    xf = obj.getXform();
    xf.setSize(.35,.25);
    xf.setPosition(xPivot, yPivot);

    this.mDrawPivot = false;
    //this.mPivotPos = new SquareRenderable(shader);
    //this.mPivotPos.setColor([1, .25, .5, 1]); // default color
    //xf = this.mPivotPos.getXform();
    //xf.setSize(0.005, 0.005); // always this size
}
gEngine.Core.inheritPrototype(DirectManipulation, SceneNode);

DirectManipulation.prototype.update = function(xPivot, yPivot)
{
    // Changes made by Stan--
    // To Do: add rotation update for the maninpulator
    // End Change--
    var prime = this.getXform();

    var xf = this.mSet[0].getXform();
    xf.setPosition(xPivot, yPivot + xf.getHeight() / 2);
    //.setPosition(xPivot, yPivot + xf.getHeight() / 2);

    xf = this.mSet[1].getXform();
    xf.setPosition(xPivot + xf.getWidth() / 2, yPivot + xf.getHeight() / 2);

    xf = this.mSet[2].getXform();
    xf.setPosition(xPivot, yPivot + prime.getHeight() * 2.7);

    xf = this.mSet[3].getXform();
    xf.setPosition(xPivot + prime.getHeight() * 2.7, yPivot + xf.getWidth() / 4);

    xf = this.mSet[4].getXform();
    xf.setPosition(xPivot, yPivot);
};
/*
DirectManipulation.prototype.draw = function (aCamera, parentMat, scaleMat){
    var i;
    var xfMat = this.mXform.getXform();

    if (parentMat !== undefined)
        mat4.multiply(xfMat, parentMat, xfMat);

    // Draw our own!
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera, xfMat); // pass to each renderable
    }

    if(scaleMat !== undefined)
        mat4.multiply(xfMat, (1/scaleMat), scaleMat);

    for(i = 0; i < this.mSet.length; i++){
        this.mSet[i].draw(aCamera, xfMat);
    }
    // now draw the children
    for (i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].draw(aCamera, xfMat); // pass to each renderable
    }

    // for debugging, let's draw the pivot position
    if (this.mDraw) {
        var pxf = this.getXform();
        var t = pxf.getPosition();
        var p = pxf.getPivot();
        var xf = this.mPivotPos.getXform();
        xf.setPosition(p[0] + t[0], p[1] + t[1]);
        this.mPivotPos.draw(aCamera, parentMat);
    }
};
*/