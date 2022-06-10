/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria Goemans
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Game over scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class loseScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'loseScene'});

    //initializing a variable for the game over text
    this.gameOverText = null;
    //styling the game over text
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    //adding a variable to represent the animated gif
    this.youLoseGif = null;
  }
  
  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#000000");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Over Scene");

    //loading the spritesheet image - converted a gif to a spritesheet using https://ezgif.com/gif-to-sprite/ezgif-2-de386180de.gif
    this.load.spritesheet('gif', '../images/youLoseSpriteSheet.png', {frameWidth: 480, frameHeight: 270});
  }

  create(data) {
    //creating text in the middle of the screen
    this.gameOverText = this.add.text(1920 / 2, (1080 / 2) + 250, 'Click here to play again.', this.gameOverTextStyle).setOrigin(0.5);
    //making the text interactive so that it starts the game again when it is clicked
    this.gameOverText.setInteractive({ useHandCursor: true });
    this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));

    //creating an animation by setting the frame rate (how frequently a new frame should be shown)
    //Note: below code adapted from https://www.thepolyglotdeveloper.com/2020/07/animate-spritesheets-phaser-game/
    this.anims.create({
      //setting a key so this animation can be referenced elsewhere in the code
      key: 'gameOver',
      //setting the frame rate (number of frames displayed per second)
      frameRate: 10,
      //setting which frames should be shown (all of them, starting from frame 0 (the first one) to 37)
      frames: this.anims.generateFrameNumbers('gif', { start: 0, end: 37}),
      //repeating the animation 10 times so that it keeps repeating while the user is on the lose screen
      repeat: 10
    });

    //using a variable to display the gif to the screen
    this.youLoseGif = this.add.sprite(480, 270, 'gif');
    //playing the proper animation
    this.youLoseGif.play('gameOver');
    //centring the gif horizontally and vertically on the screen
    this.youLoseGif.x = 1920 / 2;
    this.youLoseGif.y = (1080 / 2) - 100;
    //changing the scale of the image - method found at https://phasergames.com/scaling-in-phaser-3/
    this.youLoseGif.displayWidth = (1920 / 2); this.youLoseGif.scaleY=this.youLoseGif.scaleX;
  }

  update(time, delta) {
  }
}

export default loseScene
