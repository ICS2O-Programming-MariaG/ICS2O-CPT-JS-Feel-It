// Copyright (c) 2022 Maria Goemans All rights reserved
//
// Created by: Maria G
// Created on: May 30, 2022
// This file contains the JS code for index.html

/* global Phaser */

//using a constant to set up the basic Phaser game
const config = {
  //type of game
  type: Phaser.AUTO,
  //dimensions of screen
  width: 1920,
  height: 1080,
  backgroundColor: 0x5f6e7a
}

const game = new Phaser.Game(config);
console.log(game);
