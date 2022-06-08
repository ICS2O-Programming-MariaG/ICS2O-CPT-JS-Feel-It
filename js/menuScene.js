/* global Phaser */
// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Maria Goemans
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Menu scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class menuScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'menuScene'});

    //initializing a variable for the background image
    this.menuSceneBackgroundImage = null;

    //initializing a variable for the button
    this.startButton = null;

    //initializing a variable for the text on the menu screen
    this.explanatoryText = null;

    //initializing a variable to style the text on the menu screen
    this.menuSceneTextStyle = {font: '30px Arial', fill: '#ffffff', align: 'left'};
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Menu Scene");

    //loading background image
    this.load.image('menuSceneBackground', '../images/menuSceneBackground.jpg');

    //loading image for button
    this.load.image('startButton', '../images/startButton.webp');
  }

  create(data) {
    //creating background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    //centring background image on screen
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    //adding explanatory text
    this.explanatoryText = this.add.text(150, 100, 'Instructions:\nMove with the arrow keys.\nAvoid pesticides and collect flowers to gain nectar points.\nShoot down enemy pesticides with the space bar.\nIf you need more flower sprites, press A.', this.menuSceneTextStyle);

    //creating image for starting button
    this.startButton = this.add.sprite(1920 / 5, (1080 / 2) + 300, 'startButton').setScale(0.8);
    //making button interactive (responsive to user click)
    this.startButton.setInteractive({useHandCursor: true });
    //when button clicked, call a function
    this.startButton.on('pointerdown', () => this.buttonClicked());
  }

  update(time, delta) {
    //return to later
  }

  //function for when start button is clicked
  buttonClicked() {
    this.scene.start('gameScene');
  }
}

export default menuScene
