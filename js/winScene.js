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
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#FFFFFF");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Over Scene");
  }

  create(data) {
    //creating text in the middle of the screen
    this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'You win!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5);
    //making the text interactive so that it starts the game again when it is clicked
    this.gameOverText.setInteractive({ useHandCursor: true });
    this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));
  }

  update(time, delta) {
  }
}

export default winScene
