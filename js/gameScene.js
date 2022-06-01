/* global Phaser */
// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 31, 2022
// This file contains the JS code for index.html
// Game scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class gameScene extends Phaser.Scene {
  constructor() {
    //"super" accesses the properties of Phaser first
    super({key: 'gameScene'});

    //initializing the background variable
    this.gameSceneBackground = null;

    //initializing the bee sprite variable
    this.beeSprite = null;
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#BCDADE");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Scene");

    //loading the background image
    this.load.image('skyBackground', '../images/gameSceneBackground.png');

    //loading the bee sprite image
    this.load.image('beeSprite', '../images/beeSprite.png');
  }

  create(data) {
    //creating the background to display to the screen
    this.gameSceneBackground = this.add.image(0, 0, 'skyBackground');
    //positioning the background image to take up the screen
    this.gameSceneBackground.setOrigin(0, 0);

    //creating the bee sprite on the screen
    this.beeSprite = this.physics.add.sprite(100, 1080 / 2, 'beeSprite').setScale(0.25);
  }

  update(time, delta) {
    //return to later
  }
}

export default gameScene
