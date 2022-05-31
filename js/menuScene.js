/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
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
