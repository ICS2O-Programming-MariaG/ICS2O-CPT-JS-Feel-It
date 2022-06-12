/* global Phaser */
// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Maria Goemans
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Title scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class titleScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'titleScene'});
    
    //initializing title scene image variable
    this.titleSceneBackgroundImage = null;
    
    //initializing title scene text variable
    this.titleSceneText = null;

    //initializing a variable to style the text on the title screen
    this.titleSceneTextStyle = {font: '200px Times', fill: '#101358', align: 'center'};
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Title Scene");
    //loading the image to be displayed as background image
    this.load.image('titleSceneBackground', './images/titleSceneImage.webp');
  }

  create(data) {
    //creating the image loaded above
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground');
    //centring the image on the page
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    //adding text and positioning it on the screen
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 375, 'Beekeepers', this.titleSceneTextStyle).setOrigin(0.5);
  }

  update(time, delta) {
    //changing the amount of time during which this scene is shown
    if (time > 6000) {
      //changing scene to menu scene
      this.scene.switch('menuScene');
    }
  }
}

export default titleScene
