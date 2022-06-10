/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria Goemans
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Game over scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class winScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'winScene'});

    //initializing a variable for the game over text
    this.gameOverText = null;
    //styling the game over text
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' };

    //initializing a variable for the high score to be displayed
    this.displayHighScore = null;

    //adding a variable to represent the animated gif
    this.youWinGif = null;

    //initializing a variable for getting the user's high score to display
    this.highScore = localStorage.getItem('Highscore');
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Over Scene");

    //loading the spritesheet image - converted a gif to a spritesheet using https://ezgif.com/gif-to-sprite/ezgif-2-de386180de.gif
    this.load.spritesheet('winGif', '../images/youWinSpriteSheet.png', {frameWidth: 500, frameHeight: 500});
  }

  create(data) {
    //creating text in the middle of the screen
    this.gameOverText = this.add.text(1920 / 2, (1080 / 2) + 300, 'Click here to play again.', this.gameOverTextStyle).setOrigin(0.5);
    //making the text interactive so that it starts the game again when it is clicked
    this.gameOverText.setInteractive({ useHandCursor: true });
    this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));

    //displaying the high score text
    this.displayHighScore = this.add.text(1920 / 2, (1080 / 2) + 200, "New high score = " + this.highScore.toString(), this.gameOverTextStyle).setOrigin(0.5);

    //creating an animation by setting the frame rate (how frequently a new frame should be shown)
    //Note: below code adapted from https://www.thepolyglotdeveloper.com/2020/07/animate-spritesheets-phaser-game/
    this.anims.create({
      //setting a key so this animation can be referenced elsewhere in the code
      key: 'youWin',
      //setting the frame rate (number of frames displayed per second)
      frameRate: 6,
      //setting which frames should be shown (all of them, starting from frame 0 (the first one) to 37)
      frames: this.anims.generateFrameNumbers('winGif', { start: 0, end: 6}),
      //repeating the animation 10 times so that it keeps repeating while the user is on the lose screen
      repeat: 10
    });

    //using a variable to display the gif to the screen
    this.youWinGif = this.add.sprite(480, 270, 'gif');
    //playing the proper animation
    this.youWinGif.play('youWin');
    //centring the gif horizontally and vertically on the screen
    this.youWinGif.x = 1920 / 2;
    this.youWinGif.y = (1080 / 2) - 100;
    //changing the scale of the image - method found at https://phasergames.com/scaling-in-phaser-3/
    this.youWinGif.displayWidth = (1920 / 3); this.youWinGif.scaleY=this.youWinGif.scaleX;
  }

  update(time, delta) {
  }
}

export default winScene
