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

    //loading the image for the "bolt"/missile fired from the from the bee
    this.load.image('bolt', '../images/bolt.png');
  }

  create(data) {
    //creating the background to display to the screen
    this.gameSceneBackground = this.add.image(0, 0, 'skyBackground');
    //positioning the background image to take up the screen
    this.gameSceneBackground.setOrigin(0, 0);

    //creating the bee sprite on the screen
    this.beeSprite = this.physics.add.sprite(100, 1080 / 2, 'beeSprite').setScale(0.25);

    //creating a "group" for all the bolts/missiles to have the same properties
    this.boltGroup = this.physics.add.group();
  }

  update(time, delta) {
    //update is called 60 times per second
    
    //variable looks for input from the keyboard to move the bee sprite left
    const keyLeftPressed = this.input.keyboard.addKey('LEFT');
    //if statement checks if left key is pressed and moves the sprite accordingly
    if (keyLeftPressed.isDown === true) {
      //moves the bee sprite left on the x-axis
      this.beeSprite.x -= 5;
      //stopping the sprite from moving off the screen
      if (this.beeSprite.x < 0) {
        this.beeSprite.x = 0;
      }
    }

    //same process used to look for input from the keyboard from the right key
    const keyRightPressed = this.input.keyboard.addKey('RIGHT');
    //if statement checks if above variable = true (right key is pressed) and moves bee sprite to the right on the x-axis
    if (keyRightPressed.isDown === true) {
      //moves the bee sprite right on the x-axis
      this.beeSprite.x += 5;
      //stopping the sprite from moving off the screen
      if (this.beeSprite.x > 1920) {
        this.beeSprite.x = 1920;
      }
    }

    //same process used to look for input from the keyboard from the up key
    const keyUpPressed = this.input.keyboard.addKey('UP');
    //if statement checks if above variable = true (up key is pressed) and moves bee up on the y-axis
    if (keyUpPressed.isDown === true) {
      //moves the bee sprite up on the y-axis
      this.beeSprite.y -= 5;
      //stopping the sprite from moving off the screen
      if (this.beeSprite.y < 0) {
        this.beeSprite.y = 0;
      }
    }

    //same process used to look for input from the keyboard from the down key
    const keyDownPressed = this.input.keyboard.addKey('DOWN');
    //if statement checks if above variable = true (down key is pressed) and moves bee down on the x-axis
    if (keyDownPressed.isDown === true) {
      //moves bee sprite down on the y-axis
      this.beeSprite.y += 5;
      //stopping the sprite from moving off the screen
      if (this.beeSprite.y > 1080) {
        this.beeSprite.y = 1080;
      }
    }

    //variable checks for space bar pressed, to fire a "bolt"/missile
    const keySpacePressed = this.inputkeyboard.addKey('SPACE');
    //if statement checks if space bar is pressed and fires bolt/missile
    if (keySpacePressed.isDown === true) {
      //using a variable to add a bolt/missile each time if statement is true
      const addNewBolt = this.physics.add.sprite(this.beeSprite.x, this.beeSprite.y, 'bolt');
      //adding the new bolt to the group of bolts in the "create" section
      this.boltGroup.add(addNewBolt);
    }
  }
}

export default gameScene
