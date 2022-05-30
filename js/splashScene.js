/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Splash scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class splashScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'splashScene'});
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#000000");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Splash Scene");
  }

  create(data) {
    //come back to later
  }

  update(time, delta) {
    //changing scene to title scene
    this.scene.switch('titleScene');
  }
}

export default splashScene