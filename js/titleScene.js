/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Title scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class titleScene extends Phaser.Scene {
  constructor() {
    //"super" runs Phaser.Scene first
    super({key: 'titleScene'});
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#ffffff");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Title Scene");
  }

  create(data) {
    //come back to later
  }

  update(time, delta) {
    //return to later
  }
}

export default titleScene
