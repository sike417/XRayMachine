/**
 * Created by jayse on 11/28/16.
 */
/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment */
/* find out more about jslint: http://www.jslint.com/help.html */

function MyWorld()
{
    // For debug
    this.mCurrentRCenter = [-1.0, -1.0];
    this.dManipCenter = [1, 1];
    this.swapText = false;
    this.dCount = 0;    //what will this be used for?
    this.dManipRenderablePos = vec2.fromValues(0, 0);
    this.dManipxformCenter = vec2.fromValues(0,0);
    // end debug var's

    this.mDrawManip = false;
    this.mSelectedNode = null;
    this.mSelectedBodyPartIndex = -1;
    this.mManipGrabbed = false;

    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
    //this.mVertexColorShader = new ColorVertexShader("src/GLSLShaders/ColorVertexVS.glsl",
    //"src/GLSLShaders/ColorVertexFS.glsl");
    this.mFileTextureShader = new FileTextureShader(
            "src/GLSLShaders/TextureVS.glsl", // Path to the VertexShader
            "src/GLSLShaders/TextureFS.glsl");    // Path to the simple FragmentShader

    this.mAllObjects = [];

    var testObject = new BodyNode(this.mFileTextureShader, "SkinLayer", 0, 4);
    this.mAllObjects.push(testObject);

    this.mCurrentObject = new InternalBodyNode(this.mFileTextureShader, "InternalLevel", 0, 4);
    // this.mCurrentObject.getXform().setSize(5,5);
    // this.mAllObjects.push(this.mCurrentObject);

    this.mBodyManipulator = new DirectManipulation(this.mConstColorShader, "BodyDM", 0.0, 0.0, [0, 0]);

}


MyWorld.prototype.draw = function (camera) {
    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();
    var i;

    if(this.swapText == false)
    {
        for (i = 0; i < this.mAllObjects.length; i++)
            this.mAllObjects[i].draw(camera, 0, 0);
    }
    else
    {
        this.mCurrentObject.draw(camera, 0, 0);
    }

    if (this.mDrawManip)
        this.mBodyManipulator.drawAll(camera, this.getSelectedParentMat());
};

MyWorld.prototype.drawWorld = function (mainCamera, smallCamera)
{
    // Step F: Starts the drawing by activating the camera
    mainCamera.setupViewProjection();
    var i;

    if(this.swapText == false)
    {
        for (i = 0; i < this.mAllObjects.length; i++)
            this.mAllObjects[i].draw(mainCamera, 0, 0);

        smallCamera.setupViewProjection();
        this.mCurrentObject.draw(smallCamera, 0, 0);
    }
    else
    {
        this.mCurrentObject.draw(mainCamera, 0, 0);

        smallCamera.setupViewProjection();

        for (i = 0; i < this.mAllObjects.length; i++)
        {
            this.mAllObjects[i].draw(smallCamera, 0, 0);

        }
    }
};

MyWorld.prototype.update = function()
{

};

// Changes Made By Stan Huber 12/1 ----------------
/*
 * The clickBody method returns true if the given world coordinates are within
 * the bounds of the body for the current object.
 * @param {int} wcX The x-axis world coordinate to check against the body.
 * @param {int} wcY The y-axis world coordinate to check against the body.
 * @return {bool} Returns true if current object's BodyNode contains the given
 * world coordinate position.
 */
MyWorld.prototype.clickBody = function (wcX, wcY) {
    var chestCenter = this.mAllObjects[0].getCurrentCenter(0);
    if (this.withinBounds(wcX, wcY, chestCenter, false)) {
        this.mDrawManip = this.updateManipulator(this.mAllObjects[0].getCenter(0), 0);
        return true;
    } else return !!this.limbSelected(wcX, wcY);
};

MyWorld.prototype.limbSelected = function (wcX, wcY) {
    for (var i = 1; i <= 13; i++) {
        this.mCurrentRCenter = this.mAllObjects[0].getCurrentCenter(i);
        if (this.withinBounds(wcX, wcY, this.mCurrentRCenter, true)) {
            this.mDrawManip = this.updateManipulator(this.mAllObjects[0].getCenter(i), i);
            return true;
        }
    }
    return false;
};

MyWorld.prototype.withinBounds = function (wcX, wcY, center, isLimb) {
    // check if the wc position is within the bounds of the center...
    // need a tolerance or part specific parameter
    var quarterWidth = 0.0;
    var quarterHeight = 0.0;

    if (isLimb) {
        quarterWidth = (0.4 * this.mAllObjects[0].getChildAt(0).getChildAt(0)
                .getRenderableAt(0).getXform().getWidth());
        quarterHeight = (0.4 * this.mAllObjects[0].getChildAt(0).getChildAt(0).
                getRenderableAt(0).getXform().getHeight());
    } else {
        quarterWidth = (0.4 * this.mAllObjects[0].getRenderableAt(0).getXform().getWidth());
        quarterHeight = (0.4 * this.mAllObjects[0].getRenderableAt(0).getXform().getHeight());
    }
    return wcX < (center[0] + quarterWidth) && wcX > (center[0] - quarterWidth) &&
        wcY < (center[1] + quarterHeight) && wcY > (center[1] - quarterHeight);
};

MyWorld.prototype.setDrawManipulator = function (drawDM) {
    this.mDrawManip = drawDM;
};

MyWorld.prototype.setSwapTexture = function(swap)
{
    this.swapText = swap;
};

MyWorld.prototype.getSwapTexture = function()
{
    return this.swapText;
};

MyWorld.prototype.getDrawManipulator = function () {
    return this.mDrawManip;
};

MyWorld.prototype.setManipGrabbed = function (mGrab) {
    this.mManipGrabbed = mGrab;
};

MyWorld.prototype.getManipGrabbed = function () {
    return this.mManipGrabbed;
};

// For debug --------------------------------
MyWorld.prototype.getRCurrentCenter = function () {
    return this.mCurrentRCenter;
};
MyWorld.prototype.getManipCenter = function () {
    return this.dManipCenter;
};
// End debug --------------------------------

MyWorld.prototype.updateManipulator = function (center, nodeIndex) {
    var xf = this.mBodyManipulator.getXform();
    var pivPos = [0, 0];
    xf.setPosition(center[0], center[1]);
    this.dManipCenter = center;

    switch (nodeIndex) {

        case 0:
            this.mSelectedNode = [this.mAllObjects[0], this.mCurrentObject];
            this.mSelectedBodyPartIndex = 0;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 1:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(1), this.mCurrentObject.getChildAt(1)];
            this.mSelectedBodyPartIndex = 1;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 2:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(2), this.mCurrentObject.getChildAt(2)];
            this.mSelectedBodyPartIndex = 2;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 3:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(3), this.mCurrentObject.getChildAt(3)];
            this.mSelectedBodyPartIndex = 3;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 4:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(4), this.mCurrentObject.getChildAt(4)];
            this.mSelectedBodyPartIndex = 4;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 5:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(1).getChildAt(0), this.mCurrentObject.getChildAt(1).getChildAt(0)];
            this.mSelectedBodyPartIndex = 5;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 6:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(2).getChildAt(0), this.mCurrentObject.getChildAt(2).getChildAt(0)];
            this.mSelectedBodyPartIndex = 6;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 7:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(3).getChildAt(0), this.mCurrentObject.getChildAt(3).getChildAt(0)];
            this.mSelectedBodyPartIndex = 7;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 8:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(4).getChildAt(0), this.mCurrentObject.getChildAt(4).getChildAt(0)];
            this.mSelectedBodyPartIndex = 8;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 9:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(0).getChildAt(0), this.mCurrentObject.getChildAt(0).getChildAt(0)];
            this.mSelectedBodyPartIndex = 9;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 10:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(2).getChildAt(0).getChildAt(0), this.mCurrentObject.getChildAt(2).getChildAt(0).getChildAt(0)];
            this.mSelectedBodyPartIndex = 10;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 11:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(1).getChildAt(0).getChildAt(0), this.mCurrentObject.getChildAt(1).getChildAt(0).getChildAt(0)];
            this.mSelectedBodyPartIndex = 11;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 12:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(4).getChildAt(0).getChildAt(0), this.mCurrentObject.getChildAt(4).getChildAt(0).getChildAt(0)];
            this.mSelectedBodyPartIndex = 12;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
        case 13:
            this.mSelectedNode = [this.mAllObjects[0].getChildAt(3).getChildAt(0).getChildAt(0), this.mCurrentObject.getChildAt(3).getChildAt(0).getChildAt(0)];
            this.mSelectedBodyPartIndex = 13;
            pivPos = this.mSelectedNode[0].getXform().getPivot();
            xf.setPivot(pivPos[0], pivPos[1]);
            return true;
    }
    return false;
};

MyWorld.prototype.clickRotate = function (wcX, wcY) {
    // For debug update the manip rotate renderable pos with the manip's xform (translation)
    vec2.transformMat4(this.dManipRenderablePos, this.mBodyManipulator.getRenderableAt(1).getXform().getPosition(),
    this.mBodyManipulator.getXform().getXform());
    // Don't allow rotation is the body is selected
    if(this.mSelectedBodyPartIndex === 0)
        return false;
    if(this.clickManip(wcX, wcY, 1))
        this.mManipGrabbed = true;

    return this.mManipGrabbed;
};

MyWorld.prototype.clickTranslate = function (wcX, wcY) {
    // Only allow translation if the whole body is selected.
    if(this.mSelectedBodyPartIndex !== 0)
        return false;
    if(this.clickManip(wcX, wcY, 2))
        this.mManipGrabbed = true;

    return this.mManipGrabbed;
};

MyWorld.prototype.clickManip = function (wcX, wcY, boxNumber) {
    // if no body part has been selected dont do the checking
    if (this.mSelectedBodyPartIndex === -1)
        return false;
    else {
        var rotatePosition = vec2.fromValues(0, 0);
        var m = this.getSelectedParentMat();
        //var m = mat4.create();
        mat4.multiply(m, m, this.mBodyManipulator.getXform().getXform());
        vec2.transformMat4(rotatePosition,
                this.mBodyManipulator.getRenderableAt(boxNumber).getXform().getPosition(), m);
        // update the manipXformed center for debugging in every exec path..
        this.dManipxformCenter = rotatePosition;
        return this.withinManipBounds(wcX, wcY, rotatePosition);
    }
};

/*
 * The getSelectedParentMat returns a Matrix representing the transformations of
 * the currently selected scene node combined with the transformations its parent
 * nodes. The method is called by draw and clickManip. The method depends on
 * this.mSelectedBodyPartIndex. If a node is not selected, then an empty matrix is
 * returned.
 * @return {mat4} The matrix representing all transformations of the selected node
 * and its parents.
 */
MyWorld.prototype.getSelectedParentMat = function () {
    var m = mat4.create();

    if (this.mSelectedBodyPartIndex === 0) {
    // The body is selected
        mat4.multiply(m, m, this.mAllObjects[0].getXform().getXform());
    }
    else if (this.mSelectedBodyPartIndex > 0 && this.mSelectedBodyPartIndex < 5) {
    // A limb is selected
        mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                this.mSelectedNode[0].getXform().getXform());
    }
    else if(this.swapText == false)
        {
    // A lower limb is selected or nothing is selected
        switch (this.mSelectedBodyPartIndex) {
            case 5: // lower left arm
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                        this.mAllObjects[0].getChildAt(1).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(1).getChildAt(0).getXform().getXform());
                break;
            case 6: // lower right arm
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                        this.mAllObjects[0].getChildAt(2).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(2).getChildAt(0).getXform().getXform());
                break;
            case 7: // lower left leg
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                        this.mAllObjects[0].getChildAt(3).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(3).getChildAt(0).getXform().getXform());
                break;
            case 8:
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                        this.mAllObjects[0].getChildAt(4).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(4).getChildAt(0).getXform().getXform());
                break;
            case 9://not sure if correct 9 .. 10 .. 11 .. 12 .. 13
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                    this.mAllObjects[0].getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //right hand
            case 10:
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                    this.mAllObjects[0].getChildAt(2).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(2).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(2).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //left hand
            case 11:
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                    this.mAllObjects[0].getChildAt(1).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(1).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(1).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //right foot
            case 12:
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                    this.mAllObjects[0].getChildAt(4).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(4).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(4).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //left foot
            case 13:
                mat4.multiply(m, this.mAllObjects[0].getXform().getXform(),
                    this.mAllObjects[0].getChildAt(3).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(3).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mAllObjects[0].getChildAt(3).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
        }
    }
    else
    {
        // A lower limb is selected or nothing is selected
        switch (this.mSelectedBodyPartIndex) {
            case 5: // lower left arm
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(1).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(1).getChildAt(0).getXform().getXform());
                break;
            case 6: // lower right arm
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(2).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(2).getChildAt(0).getXform().getXform());
                break;
            case 7: // lower left leg
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(3).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(3).getChildAt(0).getXform().getXform());
                break;
            case 8:
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(4).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(4).getChildAt(0).getXform().getXform());
                break;
            case 9://not sure if correct 9 .. 10 .. 11 .. 12 .. 13
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //right hand
            case 10:
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(2).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(2).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(2).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //left hand
            case 11:
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(1).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(1).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(1).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //right foot
            case 12:
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(4).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(4).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(4).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
            //left foot
            case 13:
                mat4.multiply(m, this.mCurrentObject.getXform().getXform(),
                    this.mCurrentObject.getChildAt(3).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(3).getChildAt(0).getXform().getXform());
                mat4.multiply(m, m, this.mCurrentObject.getChildAt(3).getChildAt(0).getChildAt(0).getXform().getXform());
                break;
        }
    }

    return m;   //always returns m, moved outside of if statements.
};

MyWorld.prototype.withinManipBounds = function (wcX, wcY, center) {
    var halfWidth = this.mBodyManipulator.getRenderableAt(1).getXform().getWidth() * 0.5;
    return wcX < (center[0] + halfWidth) && wcX > (center[0] - halfWidth) &&
        wcY < (center[1] + halfWidth) && wcY > (center[1] - halfWidth);
};

MyWorld.prototype.translateSelectedNode = function (wcX, wcY) {
    for(var i = 0; i < this.mSelectedNode.length; i++)
    {
        var currentPos = this.mSelectedNode[i].getRenderableAt(0).getXform().getPosition();
        this.mSelectedNode[i].getXform().setPosition(wcX - currentPos[0], wcY - currentPos[1]);
    }
};

MyWorld.prototype.rotateSelected = function (wcX, wcY) {
    var currentCenter = this.mAllObjects[0].getCurrentCenter(this.mSelectedBodyPartIndex);
    var mousePosX = wcX + (-1 * currentCenter[0]);
    var mousePosY = wcY + (-1 * currentCenter[1]);
    var theta = Math.abs(mousePosY / mousePosX);
    theta = Math.atan(theta);
    //if(this.dCount === 0 || this.dCount === 100 || this.dCount === 200)
      //      window.alert(" In rotateSelected with mousePos Y = opp = " + mousePosY + " adj = " +
        //        mousePosX + " current X: " + currentCenter[0] + " Y: " + currentCenter[1] );
        //this.dCount++;

    if(mousePosX > 0 && mousePosY > 0){
        // 1st Quadrant
        //this.mSelectedNode.getXform().setRotationInRad(Math.atan((mousePosY / mousePosX)));
        for(var i = 0; i < this.mSelectedNode.length; i++)
            this.mSelectedNode[i].getXform().setRotationInRad(theta);
    }
    else if(mousePosX < 0 && mousePosY > 0){
        // 2nd Quadrant
        //this.mSelectedNode.getXform().setRotationInRad(Math.atan(Math.PI - (mousePosY / Math.abs(mousePosX))));
        theta = Math.PI - theta;
        for(var i = 0; i < this.mSelectedNode.length; i++)
            this.mSelectedNode[i].getXform().setRotationInRad(theta);
    }
    else if(mousePosX < 0 && mousePosY < 0){
        // 3rd Quadrant
        //this.mSelectedNode.getXform().setRotationInRad(Math.atan(Math.PI + Math.abs((mousePosY / mousePosX))));
        theta = Math.PI + theta;
        for(var i = 0; i < this.mSelectedNode.length; i++)
            this.mSelectedNode[i].getXform().setRotationInRad(theta);
    }
    else if(mousePosX > 0 && mousePosY < 0){
        // 4th Quadrant
        //this.mSelectedNode.getXform().setRotationInRad(Math.atan((Math.PI * 2) - (Math.abs(mousePosY) / mousePosX)));
        theta = (Math.PI * 2) - theta;
        for(var i = 0; i < this.mSelectedNode.length; i++)
            this.mSelectedNode[i].getXform().setRotationInRad(theta);
    }
    else
    {
        // One of the coordinate == 0 and inverse tangent is undefined...
    }
};
// End Changes -----------------------------------

