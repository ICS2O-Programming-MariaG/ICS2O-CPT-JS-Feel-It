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

    //initializing a variable for the start button
    this.startButton = null;

    //initializing a variable for the text on the menu screen
    this.explanatoryText = null;

    //initializing a variable to style the text on the menu screen
    this.menuSceneTextStyle = {font: '30px Arial', fill: '#ffffff', align: 'left'};

    //initializing a variable for the "clear high score" button
    this.clearHighScoreButton = null;
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Menu Scene");

    //loading background image
    this.load.image('menuSceneBackground', './images/menuSceneBackground.jpg');

    //loading image for the start button
    this.load.image('startButton', './images/startButton.webp');

    //loading the image for the "clear high score" button
    this.load.image('clearHighScoreButton', './images/clearHighScoreButton.png');

    //loading the sound effect for when the high score is cleared
    this.load.audio('clearScoreClicked', './sounds/clearScoreClicked.wav');
  }

  create(data) {
    //creating background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground');
    //centring background image on screen
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    //adding explanatory text
    this.explanatoryText = this.add.text(150, 100, 'Instructions:\nMove with the arrow keys.\nAvoid pesticides and collect flowers to gain nectar points.\nShoot down enemy pesticides with the space bar.\nIf you need more flower sprites, press the Get More Flowers button.', this.menuSceneTextStyle);

    //creating image for starting button
    this.startButton = this.add.sprite(1920 / 5, (1080 / 2) + 300, 'startButton').setScale(0.8);
    //making start button interactive (responsive to user click)
    this.startButton.setInteractive({ useHandCursor: true });
    //when start button clicked, call a function that will bring the user to the game scene
    this.startButton.on('pointerdown', () => this.startButtonClicked());

    //creating the image for the "clear high score" button
    this.clearHighScoreButton = this.add.sprite(1920 * 0.8, (1080 / 2) + 330, 'clearHighScoreButton').setScale(0.3);
    //making the clear high score button interactive
    this.clearHighScoreButton.setInteractive({ useHandCursor: true });
    //when the clear high score button is clicked, call another function that will set the user's high score back to 0
    this.clearHighScoreButton.on('pointerdown', () => this.clearHighScoreButtonClicked());
  }

  update(time, delta) {
    //return to later
  }

  //function for when start button is clicked
  startButtonClicked() {
    this.scene.start('gameScene');
  }

  //function for when clear high score button is clicked
  clearHighScoreButtonClicked() {
    //setting the high score to 0
    localStorage.setItem('Highscore', 0);
    
    //console.log for debugging purposes
    console.log("Score cleared! New high score =" + localStorage.getItem('highScore'));

    //making a positive notification noise to indicate that the task has been properly performed
    this.sound.play('clearScoreClicked');
  }
}

export default menuScene
