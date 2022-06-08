/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria Goemans
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Game over scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class menuScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'gameOverScene'});

    //initializing variable for text
    this.gameOverText = null;
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
    this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.');
  }

  update(time, delta) {
  }
}

export default menuScene
