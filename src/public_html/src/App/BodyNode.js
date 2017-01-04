/**
 * Created by jayse on 11/28/16.
 */
/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BodyNode(shader, name, xPivot, yPivot)
{
    SceneNode.call(this, shader, name, false);

    // For debug ----
    this.dPivotArray = [];
    // End Debug ----

    var xf = this.getXform();
    xf.setPivot(xPivot, yPivot);

    var leftArm = new SceneNode(shader, name + "_leftArm", false);
    var rightArm = new SceneNode(shader, name + "_rightArm", false);
    var leftLeg = new SceneNode(shader, name + "_leftLeg", false);
    var rightLeg = new SceneNode(shader, name + "_rightLeg", false);
    var lowerLeftArm = new SceneNode(shader, name + "_lowerLeftArm", false);
    var lowerRightArm = new SceneNode(shader, name + "_lowerRightArm", false);
    var lowerLeftLeg = new SceneNode(shader, name + "_lowerLeftLeg", false);
    var lowerRightLeg = new SceneNode(shader, name + "_lowerRightLeg", false);
    var neck = new SceneNode(shader, name + "_neck", false);
    var head = new SceneNode(shader, name + "_head", false);
    var rightHand = new SceneNode(shader, name + "_rightHand", false);
    var leftHand = new SceneNode(shader, name + "_leftHand", false);
    var leftFoot = new SceneNode(shader, name + "_leftFoot", false);
    var rightFoot = new SceneNode(shader, name + "_rightFoot", false);

    leftArm.addAsChild(lowerLeftArm), rightArm.addAsChild(lowerRightArm),
        leftLeg.addAsChild(lowerLeftLeg), rightLeg.addAsChild(lowerRightLeg), neck.addAsChild(head),
        lowerRightArm.addAsChild(rightHand), lowerLeftArm.addAsChild(leftHand),
        lowerLeftLeg.addAsChild(leftFoot), lowerRightLeg.addAsChild(rightFoot);
        this.addAsChild(neck), this.addAsChild(leftArm), this.addAsChild(rightArm), this.addAsChild(leftLeg),
        this.addAsChild(rightLeg);

    var obj = new SquareRenderable(shader); //left foot
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .535, xf.getHeight() * .8);
    xf.setPosition(xPivot + .43, yPivot - 6);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_foot.png", true));
    leftFoot.addToSet(obj);

    obj = new SquareRenderable(shader); //right calf
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .68, xf.getHeight() * 1.9);
    xf.setPosition(xPivot + .55, yPivot - 4.69);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_calf_2.png", true));
    lowerLeftLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //left knee
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .77, xf.getHeight());
    xf.setPosition(xPivot + .5, yPivot - 3.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_Knee.png", true));
    leftLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //left thigh
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .93, xf.getHeight());
    xf.setPosition(xPivot + .49, yPivot - 2.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_thigh.png", true));
    leftLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //right foot
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .59, xf.getHeight() * .8);
    xf.setPosition(xPivot - .44, yPivot - 6);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_foot.png", true));
    rightFoot.addToSet(obj);

    obj = new SquareRenderable(shader); //right calf
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .68, xf.getHeight() * 1.9);
    xf.setPosition(xPivot - .41, yPivot - 4.72);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_calf_2.png", true));
    lowerRightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //right knee
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .68, xf.getHeight());
    xf.setPosition(xPivot - .45, yPivot - 3.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_Knee.png", true));
    rightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //right thigh
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .95, xf.getHeight());
    xf.setPosition(xPivot - .45, yPivot - 2.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_thigh.png", true));
    rightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //chest
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.7, xf.getHeight() * 2.4);
    xf.setPosition(xPivot + .02, yPivot + .4);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/chest.png", true));
    this.addToSet(obj);

    obj = new SquareRenderable(shader); //pelvis
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.9, xf.getHeight());
    xf.setPosition(xPivot + .02, yPivot - 1.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/pelvis.png", true));
    this.addToSet(obj);

    obj = new SquareRenderable(shader); //right bicep
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .8, xf.getHeight() * 1.4);
    xf.setPosition(xPivot - 1.2, yPivot + .7);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_bicep.png", true));
    rightArm.addToSet(obj);

    obj = new SquareRenderable(shader); //right forearm
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * 1.15);
    xf.setPosition(xPivot - 1.35, yPivot - .58);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_forearm.png", true));
    lowerRightArm.addToSet(obj);

    obj = new SquareRenderable(shader); //right hand
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.1, xf.getHeight() * 1.2);
    xf.setPosition(xPivot - 1.88, yPivot - 1.75);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/right_hand.png", true));
    rightHand.addToSet(obj);

    // Changing the Renderable translation and translating the entire arm
    obj = new SquareRenderable(shader); //left shoulder
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .86, xf.getHeight() * 1.45);
    xf.setPosition(xPivot + 1.3, yPivot + .71);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_bicep.png", true));
    leftArm.addToSet(obj);

    obj = new SquareRenderable(shader); //left forearm
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .9, xf.getHeight() * 1.2);
    xf.setPosition(xPivot + 1.45, yPivot - .61);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_forearm.png", true));
    lowerLeftArm.addToSet(obj);

    obj = new SquareRenderable(shader); //left hand
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .85, xf.getHeight() * 1.2);
    xf.setPosition(xPivot + 1.8, yPivot - 1.75);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/left_hand.png", true));
    leftHand.addToSet(obj);

    obj = new SquareRenderable(shader); //neck
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * .4);
    xf.setPosition(xPivot + .06, yPivot + 1.78);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/neck.png", true));
    neck.addToSet(obj);

    obj = new SquareRenderable(shader); //head
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * 1);
    xf.setPosition(xPivot, yPivot + 2.45);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skin_Level/head.png", true));
    head.addToSet(obj);


    // Set the pivots
    // Left Arm
    xf = leftArm.getXform();
    var xf2 = leftArm.getRenderableAt(0).getXform();
    var halfWidth = xf2.getWidth() * 0.5;
    var halfHeight = xf2.getHeight() * 0.35;
    var nodeCenter = xf2.getPosition();
    xf.setPivot((nodeCenter[0] - halfWidth), (nodeCenter[1] + halfHeight));
    // Debug Array
    this.dPivotArray[0] = [[(nodeCenter[0] - halfWidth), (nodeCenter[1] + halfHeight)]];

    // Right Arm
    xf = rightArm.getXform();
    xf2 = rightArm.getRenderableAt(0).getXform();
    halfWidth = xf2.getWidth() * 0.5;
    halfHeight = xf2.getHeight() * 0.35;
    nodeCenter = xf2.getPosition();
    xf.setPivot((nodeCenter[0] + halfWidth), (nodeCenter[1] + halfHeight));
    this.dPivotArray[1] = [[(nodeCenter[0] + halfWidth), (nodeCenter[1] + halfHeight)]];

    // Left Leg
    xf = leftLeg.getXform();
    xf2 = leftLeg.getRenderableAt(0).getXform();
    halfWidth = xf2.getWidth() * .1;
    halfHeight = xf2.getHeight() * 1.5;
    nodeCenter = xf2.getPosition();
    xf.setPivot(nodeCenter[0] - halfWidth, nodeCenter[1] + halfHeight);
    this.dPivotArray[2] = [[nodeCenter[0], nodeCenter[1] + halfHeight]];

    // Right Leg -- Same HalfHeight as Left Leg width not needed
    xf = rightLeg.getXform();
    xf2 = rightLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfWidth = xf2.getWidth() * .1;
    halfHeight = xf2.getHeight() * 1.5;
    xf.setPivot(nodeCenter[0] + halfWidth, (nodeCenter[1] + halfHeight));
    this.dPivotArray[3] = [[nodeCenter[0], (nodeCenter[1] + halfHeight)]];

    // Lower Limbs
    // Left Arm
    xf = lowerLeftArm.getXform();
    xf2 = leftArm.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[4] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];

    // Lower Right Arm
    xf = lowerRightArm.getXform();
    xf2 = rightArm.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[5] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];

    // Lower Left Leg
    xf = lowerLeftLeg.getXform();
    xf2 = leftLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[6] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];

    // Lower Right Leg
    xf = lowerRightLeg.getXform();
    xf2 = rightLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[7] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];

    xf = head.getXform();
    xf2 = neck.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * .5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] + halfHeight));
    this.dPivotArray[8] = [[nodeCenter[0], (nodeCenter[1] + halfHeight)]];

    //right hand
    xf = rightHand.getXform();
    xf2 = lowerRightArm.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfWidth = xf2.getWidth() * .25;
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0] - halfWidth, (nodeCenter[1] - halfHeight));
    this.dPivotArray[9] = [[nodeCenter[0] - halfWidth, (nodeCenter[1] - halfHeight)]];

    //left hand
    xf = leftHand.getXform();
    xf2 = lowerLeftArm.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfWidth = xf2.getWidth() * .25;
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0] + halfWidth, (nodeCenter[1] - halfHeight));
    this.dPivotArray[10] = [[nodeCenter[0] + halfWidth, (nodeCenter[1] - halfHeight)]];

    //right foot
    xf = rightFoot.getXform();
    xf2 = lowerRightLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[11] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];

    //left foot
    xf = leftFoot.getXform();
    xf2 = lowerLeftLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfHeight = xf2.getHeight() * 0.5;
    xf.setPivot(nodeCenter[0], (nodeCenter[1] - halfHeight));
    this.dPivotArray[12] = [[nodeCenter[0], (nodeCenter[1] - halfHeight)]];
}
gEngine.Core.inheritPrototype(BodyNode, SceneNode);

BodyNode.prototype.getCenter = function (bodyPart) {
    var position = vec2.fromValues(0, 0);
    switch (bodyPart) {
        // The chest renderable through its xform and body node xform
        case 0:
            vec2.transformMat4(position, position, this.mSet[0].getXform().getXform());
            return position;
            // Left Arm - return the transformed center of the left arm's shoulder renderable
        case 1:
            vec2.transformMat4(position, position, this.mChildren[1].mSet[0].getXform().getXform());
            // position[0] -= .4;
            return position;
            // Right Arm
        case 2:
            vec2.transformMat4(position, position, this.mChildren[2].mSet[0].getXform().getXform());
            // position[0] += .5;
            return position;
            // Left Leg
        case 3:
            vec2.transformMat4(position, position, this.mChildren[3].mSet[1].getXform().getXform());
            // position[0] -= .4;
            return position;
            // Right Leg
        case 4:
            vec2.transformMat4(position, position, this.mChildren[4].mSet[1].getXform().getXform());
            // position[0] += .5;
            return position;
            // Lower Left Arm Xf-body * Xf-Larm * Xf-lowerLarm * Xf-forearmRenderable
        case 5:
            vec2.transformMat4(position, position,
                    this.mChildren[1].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] -= .2;
            return position;
            // Lower Right Arm
        case 6:
            vec2.transformMat4(position, position,
                    this.mChildren[2].mChildren[0].getRenderableAt(0).getXform().getXform());
            return position;
            // Lower Left Leg
        case 7:
            vec2.transformMat4(position, position,
                    this.mChildren[3].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] -= .45;
            return position;
            // Lower Right Leg
        case 8:
            vec2.transformMat4(position, position,
                    this.mChildren[4].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] += .6;
            return position;
            //head
        case 9:
            vec2.transformMat4(position, position, this.mChildren[0].mChildren[0].getRenderableAt(0)
                .getXform().getXform());
            return position;
            //right hand
        case 10:
            vec2.transformMat4(position, position,
                this.mChildren[2].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] += .2;
            return position;
            //left hand
        case 11:
            vec2.transformMat4(position, position,
                this.mChildren[1].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] += .2;
            return position;
            //right foot
        case 12:
            vec2.transformMat4(position, position,
                this.mChildren[4].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] += .2;
            return position;
            //left foot
        case 13:
            vec2.transformMat4(position, position,
                this.mChildren[3].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            // position[0] += .2;
            return position;
    }
};

BodyNode.prototype.getCurrentCenter = function (bodyPart) {
    var m = mat4.create();
    var n = mat4.create();
    var o = mat4.create();

    var position = vec2.fromValues(0, 0);

    switch (bodyPart) {
        // The chest renderable through its xform and body node xform
        case 0:
            mat4.multiply(m, this.getXform().getXform(), this.mSet[0].getXform().getXform());
            vec2.transformMat4(position, position, m);
            return position;
            // Left Arm - return the transformed center of the left arm's shoulder renderable
        case 1:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[1].getXform().getXform());
            mat4.multiply(m, m, this.mChildren[1].mSet[0].getXform().getXform());
            vec2.transformMat4(position, position, m);
            // position[0] ;
            return position;
            // Right Arm
        case 2:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[2].getXform().getXform());
            mat4.multiply(m, m, this.mChildren[2].mSet[0].getXform().getXform());
            vec2.transformMat4(position, position, m);
            // position[0] += .4;
            return position;
            // Left Leg
        case 3:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[3].getXform().getXform());
            mat4.multiply(m, m, this.mChildren[3].mSet[1].getXform().getXform());
            vec2.transformMat4(position, position, m);
            // position[0] -= .4;
            return position;
            // Right Leg
        case 4:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[4].getXform().getXform());
            mat4.multiply(m, m, this.mChildren[4].mSet[1].getXform().getXform());
            vec2.transformMat4(position, position, m);
            // position[0] += .4;
            return position;
            // Lower Left Arm
        case 5:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[1].getXform().getXform());
            mat4.multiply(n, this.mChildren[1].mChildren[0].getXform().getXform(),
                    this.mChildren[1].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
            // Lower Right Arm
        case 6:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[2].getXform().getXform());
            mat4.multiply(n, this.mChildren[2].mChildren[0].getXform().getXform(),
                    this.mChildren[2].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
            // Lower Left Leg
        case 7:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[3].getXform().getXform());
            mat4.multiply(n, this.mChildren[3].mChildren[0].getXform().getXform(),
                    this.mChildren[3].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            // position[0] -= .45;
            return position;
            // Lower Right Leg
        case 8:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[4].getXform().getXform());
            mat4.multiply(n, this.mChildren[4].mChildren[0].getXform().getXform(),
                    this.mChildren[4].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            // position[0] += .8;
            return position;
            //head
        case 9:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[0].getXform().getXform());
            mat4.multiply(n, this.mChildren[0].mChildren[0].getXform().getXform(),
                this.mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            // position[0] += .8;
            return position;
            //right hand
        case 10:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[2].getXform().getXform());
            mat4.multiply(o, this.mChildren[2].mChildren[0].getXform().getXform(),
                this.mChildren[2].mChildren[0].mChildren[0].getXform().getXform());
            mat4.multiply(n, o,
                this.mChildren[2].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
            //left hand
        case 11:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[1].getXform().getXform());
            mat4.multiply(o, this.mChildren[1].mChildren[0].getXform().getXform(),
                this.mChildren[1].mChildren[0].mChildren[0].getXform().getXform());
            mat4.multiply(n, o,
                this.mChildren[1].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
            //right foot
        case 12:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[4].getXform().getXform());
            mat4.multiply(o, this.mChildren[4].mChildren[0].getXform().getXform(),
                this.mChildren[4].mChildren[0].mChildren[0].getXform().getXform());
            mat4.multiply(n, o,
                this.mChildren[4].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
            //left foot
        case 13:
            mat4.multiply(m, this.getXform().getXform(), this.mChildren[3].getXform().getXform());
            mat4.multiply(o, this.mChildren[3].mChildren[0].getXform().getXform(),
                this.mChildren[3].mChildren[0].mChildren[0].getXform().getXform());
            mat4.multiply(n, o,
                this.mChildren[3].mChildren[0].mChildren[0].getRenderableAt(0).getXform().getXform());
            mat4.multiply(m, m, n);
            vec2.transformMat4(position, position, m);
            return position;
    }
};
// For Debug
BodyNode.prototype.getPivotArray = function () {
    return this.dPivotArray;
};