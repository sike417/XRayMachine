/**
 * Created by jayse on 11/28/16.
 */
/*
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, MyWorld, Camera, CanvasMouseSupport */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform"]);

myModule.controller("MainCtrl", function ($scope)
{

    $scope.mNeedUpdate = false;
    $scope.mMoveView = false;

    gEngine.Core.initializeWebGL('GLCanvas');
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');

    $scope.mMyWorld = new MyWorld();

    // Changes Made By Stan Huber 12/1 ------------
    $scope.gXrayMode = false;
    $scope.gEditMode = false;
    $scope.gSwapTexture = false;
    $scope.gRotateGrabbed = false;
    $scope.gTranslateGrabbed = false;
    $scope.gZoomMode = false;
    $scope.mZoomNum = 15;
    $scope.mZoomView = 1.7;
    $scope.mIsZoom = false;

    // For Debug ---------------
    $scope.gCanvasX = 0; // Maybe keep beyond debug and eliminate var creations
    $scope.gCanvasY = 0; // Maybe keep beyond debug and eliminate var creations
    $scope.gSelectedBone = 0;
    $scope.gDrawingManip = false;
    $scope.gLArmCenter = $scope.mMyWorld.mAllObjects[0].mChildren[0].getRenderableAt(0).getXform().getPosition();
    $scope.gLArmCenterX = $scope.gLArmCenter[0];
    $scope.gLArmCenterY = $scope.gLArmCenter[1];
    $scope.gRLACenter = $scope.mMyWorld.getRCurrentCenter();
    $scope.dDMCenter = $scope.mMyWorld.getManipCenter();
    $scope.dPivotPosition = [];
    $scope.dManipRenderPos = $scope.mMyWorld.dManipRenderablePos;
    $scope.dManipXformed = $scope.mMyWorld.dManipxformCenter;
    
   // End Debug ---------------
    // End Changes --------------------------------

    $scope.mSmallViewWCWidth = 30;
    $scope.mSmallViewport = [100, 200, 200, 200];
    $scope.mSmallViewWCCenter = [-5, -10];

    $scope.mView = new Camera(
        [0, 3], // wc Center
        15, // wc Wdith
        [0, 0, 800, 600]);  // viewport: left, bottom, width, height
    $scope.mSmallView = new Camera(
        [0,6.2],
        1.7,
        [0,0,100,100]
    );
    $scope.mSmallView.setViewport([350, 425, 100, 100]); //left, bottom, width, height
    // $scope.mSmallView.setBackgroundColor([.2, .2, .2, 1]);
    $scope.mSmallView.setBackgroundColor([0, 0, 0, .4]);

    $scope.serviceMove = function (event)
    {
        var canvasX = $scope.mCanvasMouse.getPixelXPos(event);
        var canvasY = $scope.mCanvasMouse.getPixelYPos(event);
       
        // For Debug or to get rid of var canvas creations...12/1
        $scope.gCanvasX = canvasX;
        $scope.gCanvasY = canvasY;
       
        if ($scope.mLastWCPosX === undefined)
        {
            $scope.mLastCanvasX = canvasX;
            $scope.mLastCanvasY = canvasY;

            $scope.mLastWCPosX = this.mView.mouseWCX(canvasX);
            $scope.mLastWCPosY = this.mView.mouseWCY(canvasY);
        }

        $scope.mCurrentWCPosX = this.mView.mouseWCX(canvasX);
        $scope.mCurrentWCPosY = this.mView.mouseWCY(canvasY);

        if ($scope.mMoveView === true)
        {
            var tempArry = $scope.mSmallView.getViewport();
            $scope.mSmallView.setViewport([tempArry[0] - $scope.mLastCanvasX + canvasX, tempArry[1] - $scope.mLastCanvasY + canvasY
                        , tempArry[2], tempArry[3]]);
            $scope.mSmallView.setWCCenter($scope.mSmallView.getWCCenter()[0] - $scope.mLastWCPosX + $scope.mCurrentWCPosX,
                    $scope.mSmallView.getWCCenter()[1] - $scope.mLastWCPosY + $scope.mCurrentWCPosY);
        }
        // Implement the rotation and translation of body and body parts
        else if($scope.gRotateGrabbed){
            // Rotate manipulator is grabbed .. Rotate the transform of the selectedNode
            $scope.mMyWorld.rotateSelected($scope.mCurrentWCPosX, $scope.mCurrentWCPosY);
        }
        else if($scope.gTranslateGrabbed){
            // Translate manipulator is grabbed .. Translate the body with mouse movement
            $scope.mMyWorld.translateSelectedNode($scope.mCurrentWCPosX, $scope.mCurrentWCPosY);

        }

        // LastCanvasX gets updated every time mouse moves...
        $scope.mLastCanvasX = canvasX, $scope.mLastCanvasY = canvasY;
        $scope.mLastWCPosX = $scope.mCurrentWCPosX, $scope.mLastWCPosY = $scope.mCurrentWCPosY;

    };

    $scope.serviceDown = function ($event)
    {
   
         
         switch($event.which) {
             case 1:
                      var canvasX = $scope.mCanvasMouse.getPixelXPos(event);
        var canvasY = $scope.mCanvasMouse.getPixelYPos(event);
        $scope.mLastWCPosX = this.mView.mouseWCX(canvasX);
        $scope.mLastWCPosY = this.mView.mouseWCY(canvasY);
        
        if($scope.gXrayMode)
            $scope.mMoveView = $scope.withinArea(canvasX, canvasY);
        else if ($scope.gEditMode)
        {
            if($scope.mMyWorld.getDrawManipulator()){
                if($scope.mMyWorld.clickRotate($scope.mLastWCPosX, $scope.mLastWCPosY))
                    $scope.gRotateGrabbed = true;
                else if($scope.mMyWorld.clickTranslate($scope.mLastWCPosX, $scope.mLastWCPosY))
                    $scope.gTranslateGrabbed = true;
                // For Debug ----------------------------------------------
                $scope.dManipRenderPos = $scope.mMyWorld.dManipRenderablePos;
                $scope.dManipXformed = $scope.mMyWorld.dManipxformCenter;
                // End Debug updates --------------------------------------
            }
            if (!$scope.mMyWorld.getManipGrabbed()) {
                if ($scope.mMyWorld.clickBody($scope.mLastWCPosX,
                        $scope.mLastWCPosY)) {
                    $scope.gDrawingManip = true;
                    $scope.dDMCenter = $scope.mMyWorld.getManipCenter();
                }
            }
        }
        // for debug
         $scope.gRLACenter = $scope.mMyWorld.getRCurrentCenter();

             break;
             
            case 3:
                if($scope.gZoomMode){
                    $scope.mCurrentWCPosX = this.mView.mouseWCX($event.clientX);
                    $scope.mCurrentWCPosY = this.mView.mouseWCY($event.clientY);
                    $scope.mView.setWCCenter(0,3);
                    $scope.mView.setWCCenter(this.mView.mouseWCX(event.clientX)-8.2,-this.mView.mouseWCY(event.clientY)+7.1);

                    $scope.mIsZoom = true;
                    $scope.mView.changeViewProjection();
                    //$scope.viewport = $scope.mSmallView.getViewport();
                    //$scope.mSmallView.setViewport([$scope.viewport[0]-100,$scope.viewport[0]-100,500,500]);
                }
                
            break;    
         }

            
    };

    $scope.serviceUp = function ()
    {
        $scope.mMoveView = false;
        $scope.gRotateGrabbed = false;
        $scope.gTranslateGrabbed = false;
        $scope.mMyWorld.setManipGrabbed(false);
        $scope.mIsZoom = false;
        if($scope.gZoomMode){
            $scope.mView.setWCCenter(0,3);
        }
    };


    // Changes Made By Stan Huber 12/1 ------------
    $scope.serviceXrayBox = function () {
        // Three possible modes: XRay, Edit, Highlight
        if ($scope.gXrayMode) {
            $scope.gEditMode = !$scope.gXrayMode;
            // $scope.gSwapTexture = !$scope.gXrayMode;
            $scope.gZoomMode = !$scope.gXrayMode;
            $scope.mMyWorld.setDrawManipulator(false);
        }
    };
    
    $scope.toggleZoom = function () {
        if($scope.gZoomMode){
            $scope.gSwapTexture = !$scope.gZoomMode;
            //$scope.gEditMode = !$scope.gZoomMode;
            $scope.gXrayMode = !$scope.gZoomMode;
        }
    };

    $scope.serviceEditBox = function () {
        // Three possible modes: XRay, Edit, Highlight
        if ($scope.gEditMode) {
            $scope.gXrayMode = !$scope.gEditMode;
            // $scope.gSwapTexture = !$scope.gEditMode;
        }
        else{
            $scope.gDrawingManip = false;
            $scope.mMyWorld.setDrawManipulator(false);
        }
    };

    $scope.serviceSwapTexture = function () {
        // Three possible modes: XRay, Edit, Highlight
        if ($scope.gSwapTexture) {
            // $scope.gXrayMode = !$scope.gSwapTexture;
            // $scope.gEditMode = !$scope.gSwapTexture;
            $scope.mMyWorld.setSwapTexture(true);
        }
        else
            $scope.mMyWorld.setSwapTexture(false);
    };
    // End Changes --------------------------------
    // Changed by Stan Huber 12/1 -------------
    //  Only returns true to move smallView if click is in smallView
    $scope.withinArea = function (clickX, clickY)
    {
        var vP = $scope.mSmallView.getViewport();
        return clickX > vP[0] && clickX < (vP[0] + vP[2]) && clickY > vP[1] &&
            clickY < (vP[1] + vP[3]);
    };
    // End Changes -----------------------------
    $scope.mainTimerHandler = function () {
        // 1. update the world
        $scope.mNeedUpdate = false;
        //$scope.mMyWorld.update();

        // Step E: Clear the canvas
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas
        // Debug
        $scope.gDrawingManip = $scope.mMyWorld.getDrawManipulator(); 
        $scope.dPivotPosition = $scope.mMyWorld.mAllObjects[0].getPivotArray();
        // End Debug
        // $scope.mMyWorld.update();
        if($scope.gXrayMode)
            $scope.mMyWorld.drawWorld($scope.mView, $scope.mSmallView);
        else
            $scope.mMyWorld.draw($scope.mView);
        
        if($scope.mIsZoom && $scope.mZoomNum >= 4 && $scope.gZoomMode){
            
            $scope.mView.setWCWidth($scope.mZoomNum -= 1);
            
        } else if(!$scope.mIsZoom && $scope.mZoomNum < 15 && $scope.gZoomMode) {
            
            $scope.mView.setWCWidth($scope.mZoomNum += 1);
        
        }
      
    };
});


// Changes Made By Stan Huber 12/1 ------------
// End Changes --------------------------------