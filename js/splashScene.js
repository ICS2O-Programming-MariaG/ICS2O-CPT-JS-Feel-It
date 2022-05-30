/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Splash scene

class splashScene extends Phaser.Scene {
  constructor() {
    super({key: 'splashScene'});
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#d8fbde");
  }

  preload() {
    console.log("Splash Scene");
  }

  create(data) {
    //pass
  }

  update(time, delta) {
    //pass
  }
}

export default splashScene
