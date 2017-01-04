/**
 * Created by jayse on 11/30/16.
 */
/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function InternalBodyNode(shader, name, xPivot, yPivot)
{
    SceneNode.call(this, shader, name, true);

    // For debug ----
    this.dPivotArray = [];
    // End Debug ----

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
    var xf = obj.getXform();
    xf.setSize(xf.getWidth() * .5, xf.getHeight() * 1.1);
    xf.setPosition(xPivot + .5, yPivot - 5.75);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_foot_3.png", true));
    leftFoot.addToSet(obj);

    obj = new SquareRenderable(shader); //left calf
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .4, xf.getHeight() * 1.653);
    xf.setPosition(xPivot + .55, yPivot -4.552);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_calf.png", true));
    lowerLeftLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //left knee
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 0.42, xf.getHeight() * 0.35);
    xf.setPosition(xPivot + .53, yPivot -3.55);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_knee.png", true));
    leftLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //left thigh
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .7, xf.getHeight() * 1.653);
    xf.setPosition(xPivot + .5, yPivot -2.551);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_thigh.png", true));
    leftLeg.addToSet(obj);


    obj = new SquareRenderable(shader); //right foot
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .5, xf.getHeight() * 1.1);
    xf.setPosition(xPivot - .5, yPivot -5.75);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_foot_3.png", true));
    rightFoot.addToSet(obj);

    obj = new SquareRenderable(shader); //right calf
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .5, xf.getHeight() * 1.653);
    xf.setPosition(xPivot - .45, yPivot -4.552);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_calf.png", true));
    lowerRightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //right knee
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 0.45, xf.getHeight() * 0.35);
    xf.setPosition(xPivot - .47, yPivot -3.55);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_knee.png", true));
    rightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //right thigh
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .7, xf.getHeight() * 1.653);
    xf.setPosition(xPivot - .44, yPivot -2.551);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_thigh.png", true));
    rightLeg.addToSet(obj);

    obj = new SquareRenderable(shader); //chest
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.75725, xf.getHeight() * 2.349);
    xf.setPosition(xPivot + .06, yPivot + 0.2765);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/chest.png", true));
    this.addToSet(obj);

    obj = new SquareRenderable(shader); //pelvis
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.7, xf.getHeight() * .87);
    xf.setPosition(xPivot + .04, yPivot -1.333);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/pelvis.png", true));
    this.addToSet(obj);

    obj = new SquareRenderable(shader); //right bicep
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .8, xf.getHeight() * 1.55);
    xf.setPosition(xPivot - 1.2, yPivot + 0.6245);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_bicep.png", true));
    rightArm.addToSet(obj);

    obj = new SquareRenderable(shader); //right hand
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * 1);
    xf.setPosition(xPivot - 2.05, yPivot -1.8);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_hand.png", true));
    rightHand.addToSet(obj);

    obj = new SquareRenderable(shader); //right forearm
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.1, xf.getHeight() * 1.392);
    xf.setPosition(xPivot - 1.55, yPivot -0.8);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/right_forearm.png", true));
    lowerRightArm.addToSet(obj);

    obj = new SquareRenderable(shader); //left bicep
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .85, xf.getHeight() * 1.55);
    xf.setPosition(xPivot + 1.35, yPivot + 0.6245);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_bicep.png", true));
    leftArm.addToSet(obj);

    obj = new SquareRenderable(shader); //left hand
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * 1);
    xf.setPosition(xPivot + 1.95, yPivot - 1.8);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_hand.png", true));
    leftHand.addToSet(obj);

    obj = new SquareRenderable(shader); //left forearm
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1.1, xf.getHeight() * 1.392);
    xf.setPosition(xPivot + 1.5, yPivot -0.8);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/left_forearm.png", true));
    lowerLeftArm.addToSet(obj);

    obj = new SquareRenderable(shader); //neck
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * 1, xf.getHeight() * 0.4959);
    xf.setPosition(xPivot, yPivot + 1.6685);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/neck.png", true));
    neck.addToSet(obj);

    obj = new SquareRenderable(shader); //head
    xf = obj.getXform();
    xf.setSize(xf.getWidth() * .85, xf.getHeight() * 1.2);
    xf.setPosition(xPivot, yPivot + 2.3);
    obj.addFileTexture(new FileTextureSupport("Assets/images/Skeleton_level/head_2.png", true));
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
    halfHeight = xf2.getHeight() * 4.5;
    nodeCenter = xf2.getPosition();
    xf.setPivot(nodeCenter[0] + halfWidth, nodeCenter[1] + halfHeight);
    this.dPivotArray[2] = [[nodeCenter[0] + halfWidth, nodeCenter[1] + halfHeight]];

    // Right Leg -- Same HalfHeight as Left Leg width not needed
    xf = rightLeg.getXform();
    xf2 = rightLeg.getRenderableAt(0).getXform();
    nodeCenter = xf2.getPosition();
    halfWidth = xf2.getWidth() * .1;
    halfHeight = xf2.getHeight() * 4.5;
    xf.setPivot(nodeCenter[0] - halfWidth, (nodeCenter[1] + halfHeight));
    this.dPivotArray[3] = [[nodeCenter[0] - halfWidth, (nodeCenter[1] + halfHeight)]];

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
gEngine.Core.inheritPrototype(InternalBodyNode, SceneNode);
