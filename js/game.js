// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 30, 2022
// This file contains the JS code for index.html
// Phaser 3 configuration file

/* global Phaser */

//using a constant to set up the basic Phaser game
const CONFIG = {
  //type of game
  type: Phaser.AUTO,
  //dimensions of screen
  width: 1920,
  height: 1080,
  //setup so default arcade games can be played
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    },
  },
  //settings for background
  backgroundColor: 0xBCDADE,
  //making scale of background change when screen/window size changes
  scale: {
    mode: Phaser.Scale.FIT,
    //centring the background on the page
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const GAME = new Phaser.Game(CONFIG);
console.log(GAME);
