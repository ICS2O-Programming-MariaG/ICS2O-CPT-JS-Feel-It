/* global Phaser */
// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Modified by: Maria Goemans
// Created on: May 31, 2022
// This file contains the JS code for index.html
// Game scene

//code written below extends (adds to) prewritten code in Phaser.Scene
class gameScene extends Phaser.Scene {

  //function definition for creating a pesticide enemy (using a function because it will be referenced multiple times throughout the code)
  createPesticide() {
    //creating a variable to make enemies appear at a random y location between 1 and 1080 px
    const pesticideYLocation = Math.floor(Math.random() * 1080) + 1;
    
    //using a variable and Math.random() to make the pesticides move slightly up or down and be less predictable
    let pesticideYVelocity = Math.floor(Math.random() * 50) + 1;
    //multiplying the pesticideYVelocity by a negative or positive 1 to make pesticides move slightly up or down
    pesticideYVelocity *= Math.round(Math.random()) ? 1 : -1;
    
    //creating a variable that makes an enemy appear each time this function is called
    const aPesticide = this.physics.add.sprite(1920, pesticideYLocation, 'pesticide').setScale(0.4);
    
    //adding an x velocity to the pesticide created using physics to make the enemy move to the right of the screen (towards the bee sprite)
    aPesticide.body.velocity.x = -200;
    //adding the y velocity using the variable defined above
    aPesticide.body.velocity.y = pesticideYVelocity;
    
    //adding the new sprite enemy created to the pesticide group
    this.pesticideGroup.add(aPesticide);
  }

  //function definition for creating a flower (using a function because it will be referenced multiple times throughout the code)
  createFlower() {
    //creating a variable to make flowers appear at a random y location between 1 and 1080 px
    const flowerYLocation = Math.floor(Math.random() * 1080) + 1;

    //creating a variable that makes a flower appear each time this function is called
    const aFlower = this.physics.add.sprite(1920, flowerYLocation, 'flower').setScale(0.2);

    //adding an x velocity to the flower to make the flower move to the right of the screen
    aFlower.body.velocity.x = -200;

    //adding the new flower sprite created to the flower group
    this.flowerGroup.add(aFlower);
  }

  //defining the function moreFlowersButtonClicked - when the user clicks this button, a new flower sprite and a new pesticide will appear on the screen
  //this is to fix the problem where, if the bee sprite dodges all the sprites, no new ones show up on the screen
  moreFlowersButtonClicked() {
    //adding 1 to the flower button counter
    this.numTimesFlowerButtonClicked += 1;
    //only adding more flowers if the flower button has not already been used 3 times
    if (this.numTimesFlowerButtonClicked <= 3) {
      //calling the function twice to create two new flower sprites
      this.createFlower();
      this.createFlower();
      //calling the function to create a new pesticide enemy sprite
      this.createPesticide();
    }
    else {
      //alerting the user to the fact that the flower button is used up if the button has been clicked more than 3 times
      this.add.text(1200, 40, "Flower Button is Used Up.", this.flowerButtonUsedUpTextStyle);
      //destroying the get more flowers button, replacing it with the above text
      this.getMoreFlowers.destroy();
    }
  }
  
  constructor() {
    //"super" accesses the properties of Phaser first
    super({key: 'gameScene'});

    //initializing the background variable
    this.gameSceneBackground = null;

    //initializing the bee sprite variable
    this.beeSprite = null;

    //creating a boolean variable which will later make sure that only one bolt can be fired each time the space bar is pressed
    this.fireBolt = false;

    //initializing variables for the score and the text displaying the score
    this.score = 0;
    this.scoreText = null;
    //using a variable to select a font for the score
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    //initializing a variable for the game over text
    this.gameOverText = null;
    //styling the game over text
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' };

    //initializing variables for health points and the text displaying the health points
    this.healthPoints = 3;
    this.healthPointsText = null;
    //using a variable to select a font for the health points
    this.healthPointsTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    //initializing a variable for the user's high score
    this.highScore = null;

    //initializing a variable to display the "get more flowers" button to the screen
    this.getMoreFlowers = null;

    //initializing a variable so that the more flowers button can only be clicked 3 times
    this.numTimesFlowerButtonClicked = null;

    //initializing a variable for the text style of the message shown when the flower button has been used 5 times
    this.flowerButtonUsedUpTextStyle = {font: '30px Arial', fill: '#fe5048', align: 'left'};
  }

  init(data) {
    //initializing background colour
    this.cameras.main.setBackgroundColor("#BCDADE");
  }

  preload() {
    //for debugging purposes: writes Splash Scene in the console to let programmer know what scene/file is being displayed
    console.log("Game Scene");

    //loading the background image
    this.load.image('skyBackground', './images/gameSceneBackground.png');

    //loading the bee sprite image
    this.load.image('beeSprite', './images/beeSprite.png');

    //loading the image for the "bolt"/missile fired from the from the bee
    this.load.image('bolt', './images/bolt.png');

    //loading the image for the "pesticide" enemy
    this.load.image('pesticide', './images/beePesticide.png');

    //loading the sound file for when a bolt is fired
    this.load.audio('boltSound', './sounds/boltFiredSound.wav');

    //loading the sound file for when a bolt destroyes a pesticide
    this.load.audio('explosion', './sounds/enemyDestroyed.wav');

    //loading the sound file for game over when user loses
    this.load.audio('endMusic', './sounds/endGameNoise.wav');

    //loading the sound file for when a pesticide collides with the bee sprite
    this.load.audio('enemyCollision', './sounds/collisionBeeAndEnemy.wav');

    //loading the image for the flower sprite
    this.load.image('flower', './images/flower.png');

    //loading the sound file for when the bee sprite collides with a flower
    this.load.audio('nectarCollected', './sounds/nectarCollected.wav');

    //loading the sound file for when the game ends and the user wins
    this.load.audio('youWinMusic', './sounds/youWinMusic.wav');

    //loading the image file for the "get more flowers" button
    this.load.image('getMoreFlowersButton', './images/moreFlowersButton.png');
  }

  create(data) {
    //creating the background to display to the screen
    this.gameSceneBackground = this.add.image(0, 0, 'skyBackground');
    //positioning the background image to take up the screen
    this.gameSceneBackground.setOrigin(0, 0);

    //setting this.highScore to the high score saved in the browser
    this.highScore = parseInt(localStorage.getItem('Highscore'));

    //creating the get more flowers button
    this.getMoreFlowers = this.add.image(1300, 50, 'getMoreFlowersButton').setScale(0.2);
    //making the button interactive (responsive to user click)
    this.getMoreFlowers.setInteractive({ useHandCursor: true });
    //when button clicked, call a function that will create one new flower and one new pesticide
    this.getMoreFlowers.on('pointerdown', () => this.moreFlowersButtonClicked());

    //adding the score text to the screen using the variables initialized in the "constructor"
    this.scoreText = this.add.text(10, 10, 'Nectar Collected: ' + this.score.toString(), this.scoreTextStyle);

    //adding the health points text to the screen using the variables initialized in the "constructor"
    this.healthPointsText = this.add.text(650, 10, 'Health Points: ' + this.healthPoints.toString(), this.healthPointsTextStyle);

    //creating the bee sprite on the screen
    this.beeSprite = this.physics.add.sprite(100, 1080 / 2, 'beeSprite').setScale(0.25);

    //creating a "group" for the same code to apply to all the bolts created
    this.boltGroup = this.physics.add.group();

    //creating a "group" for the same code to apply to all the enemy pesticides spawned
    this.pesticideGroup = this.add.group();
    //calling a function (defined at the top of the file) for creating a pesticide - this will be used to create enemies several times throughout the code
    this.createPesticide();

    //creating a "group" for the same code to apply to all the flowers spawned
    this.flowerGroup = this.add.group();
    //calling a function (defined at the top of the file) for creating a flower when the game starts
    this.createFlower();
    this.createFlower();

    //adding a physics collider: when bolts hit pesticides, call a function
    this.physics.add.collider(this.boltGroup, this.pesticideGroup, function (boltCollide, pesticideCollide) {
      //destroying the pesticide enemy upon collision
      pesticideCollide.destroy();
      
      //destroying the bolt upon collision
      boltCollide.destroy();

      //playing an explosion sound upon collision
      //explosion sound taken from https://mixkit.co/free-sound-effects/boom/
      this.sound.play('explosion');
      
      //calling function to add a new pesticide each time one is destroyed
      this.createPesticide();
      
      //binding above code to "this": 'this' represents the class created at the top of the file (gameScene)
    }.bind(this));

    //adding a physics collider: when pesticides hit bee sprite
    this.physics.add.collider(this.beeSprite, this.pesticideGroup, function (beeSpriteCollide, pesticideCollide) {
      //destroying the pesticide sprite
      pesticideCollide.destroy();
      //setting the bee sprite velocity back to 0 (otherwise the bee sprite adopts the velocity of the pesticide with which it collided)
      this.beeSprite.body.velocity.x = 0;
      
      //removing 1 health point each time pesticides collide with the bee sprite
      this.healthPoints -= 1;
      //displaying the new health points to the screen
      this.healthPointsText.setText('Health Points: ' + this.healthPoints.toString());

      //if statement checks if health points are at zero; displays ending message
      if (this.healthPoints <= 0) {
        //destroying the bee sprite
        this.beeSprite.destroy(); 
        //omitted physics.pause() to keep game moving when the user wants to play again after the end game scene is shown
        //checking if the user score is greater than the high score
        if (this.score > this.highScore) {
          //playing the winning music
          this.sound.play('youWinMusic');
          //setting the score as the new high score in localStorage (browser memory)
          this.highScore = this.score;
          localStorage.setItem('Highscore', this.highScore);
          //writing the high score in the console (for debugging purposes)
          console.log('highscore =' + this.highScore);
          //switching the scene to the you win scene
          this.scene.switch('winScene');
        }
        else if (this.score <= this.highScore) {
          //playing losing game over music
          this.sound.play('endMusic');
          //saving the score in the browser's local storage to be displayed on the losing scene
          localStorage.setItem('Score', this.score);
          //switching the scene to the you lose scene
          this.scene.switch('loseScene');
          //writing the high score and the score in the console for debugging purposes
          console.log('highscore =' + this.highScore);
          console.log('score =' + this.score);
        }
        //resetting score and health points variables
        this.score = 0;
        this.healthPoints = 3;
      }

      else {
        //playing collision music
        this.sound.play('enemyCollision');
  
        //function call to make another pesticide enemy appear at the other side of the screen
        this.createPesticide();
      }
    }.bind(this))

    //adding a third collider: when bee sprite "collects" nectar from flowers
    this.physics.add.collider(this.beeSprite, this.flowerGroup, function (beeSpriteCollide, flowerCollide) {
      //destroying the pesticide enemy upon collision
      flowerCollide.destroy();
      //setting the bee sprite velocity back to 0 (otherwise the bee sprite adopts the velocity of the pesticide with which it collided)
      this.beeSprite.body.velocity.x = 0;

      //playing an explosion sound upon collision
      //explosion sound taken from https://mixkit.co/free-sound-effects/boom/
      this.sound.play('nectarCollected');

      //adding 1 point to the score with each destroyed pesticide
      this.score = this.score + 1;
      //displaying the new score to the screen
      this.scoreText.setText('Nectar Collected: ' + this.score.toString());
      
      //calling function to add a new flower
      this.createFlower();
      //calling function to add a new enemy pesticide, too
      this.createPesticide();
      
      //binding above code to "this": 'this' represents the class created at the top of the file (gameScene)
    }.bind(this));
  }

  update(time, delta) {
    //update is called 60 times per second
    
    //variable looks for input from the keyboard to move the bee sprite left
    const keyLeftPressed = this.input.keyboard.addKey('LEFT');
    //if statement checks if left key is pressed and moves the sprite accordingly
    if (keyLeftPressed.isDown === true) {
      //moves the bee sprite left on the x-axis
      this.beeSprite.x -= 5;
      //rotating the bee sprite to face left - method found at https://phaser.discourse.group/t/load-sprite-rotated-matter-physics/6183/4
      this.beeSprite.setAngle(180);
      //wrapping the sprite to the other side of the screen when it is moved off the right of the screen
      if (this.beeSprite.x < 0) {
        this.beeSprite.x = 1920;
      }
    }

    //same process used to look for input from the keyboard from the right key
    const keyRightPressed = this.input.keyboard.addKey('RIGHT');
    //if statement checks if above variable = true (right key is pressed) and moves bee sprite to the right on the x-axis
    if (keyRightPressed.isDown === true) {
      //moves the bee sprite right on the x-axis
      this.beeSprite.x += 5;
      //rotating the bee sprite to face right - method found at https://phaser.discourse.group/t/load-sprite-rotated-matter-physics/6183/4
      this.beeSprite.setAngle(0);
      //wrapping the sprite to the other side of the screen when it is moved off the left of the screen
      if (this.beeSprite.x > 1920) {
        this.beeSprite.x = 0;
      }
    }

    //same process used to look for input from the keyboard from the up key
    const keyUpPressed = this.input.keyboard.addKey('UP');
    //if statement checks if above variable = true (up key is pressed) and moves bee up on the y-axis
    if (keyUpPressed.isDown === true) {
      //moves the bee sprite up on the y-axis
      this.beeSprite.y -= 5;
      //rotating the bee sprite to face upwards - method found at https://phaser.discourse.group/t/load-sprite-rotated-matter-physics/6183/4
      this.beeSprite.setAngle(-90);
      //wrapping the sprite to the other side of the screen when it is moved off the top of the screen
      if (this.beeSprite.y < 0) {
        this.beeSprite.y = 1080;
      }
    }

    //same process used to look for input from the keyboard from the down key
    const keyDownPressed = this.input.keyboard.addKey('DOWN');
    //if statement checks if above variable = true (down key is pressed) and moves bee down on the x-axis
    if (keyDownPressed.isDown === true) {
      //moves bee sprite down on the y-axis
      this.beeSprite.y += 5;
      //rotating the bee sprite to face down - method found at https://phaser.discourse.group/t/load-sprite-rotated-matter-physics/6183/4
      this.beeSprite.setAngle(90);
      //wrapping the sprite to the other side of the screen when it is moved off the bottom of the screen
      if (this.beeSprite.y > 1080) {
        this.beeSprite.y = 0;
      }
    }

    //variable checks for space bar pressed, to fire a "bolt"/missile
    const keySpacePressed = this.input.keyboard.addKey('SPACE');
    //if statement checks if space bar is pressed and fires bolt/missile
    if (keySpacePressed.isDown === true) {
      //checking if a bolt has already been fired while the space bar was pressed
      if (this.fireBolt === false) {
        //using a variable to add a bolt/missile each time boolean expression is true
        const addNewBolt = this.physics.add.sprite(this.beeSprite.x, this.beeSprite.y, 'bolt').setScale(0.1);
        //adding the new bolt to the group of bolts in the "create" section
        this.boltGroup.add(addNewBolt);
        //adding a sound effect (loaded in the preload section) each time a missile is fired
        this.sound.play('boltSound');
        //changing the fireBolt variable to true, indicating that a missile has been fired
        this.fireBolt = true;
      }
    }

    //using another if statement to check if space key is up, so that bolts can be fired multiple times during the game, once for each time the space bar is pressed
    if (keySpacePressed.isUp === true) {
      //resetting the fireBolt variable to false so that a bolt can be fired again the next time the space bar is pressed
      this.fireBolt = false;
    }

    //applying a function to all children (individual bolts) in the group boltGroup
    this.boltGroup.children.each(function (item) {
      //item represents each individual bolt in the group
      //changing the x-value of the bolt on the screen, making it appear to shoot towards the right side of the screen
      item.x = item.x + 15;
      //destroying the bolts after they go off the screen so that they do not take up too much memory on the computer
      if (item.x > 1920) {
        item.destroy();
      }
    })

    //checking the x value of the enemy pesticides, making them go back to the start of the screen, keeping the game going, if they have gone off the screen
    this.pesticideGroup.children.each(function (item) {
      //checking if the item has gone off the screen up, down or to the left
      if ((item.x < 0) || (item.y > 1080) || (item.y < 0)) {
        //resetting the x value to the start
        item.x = 1920;
        //picking a new random y value for when the sprite reappears
        item.y = Math.floor(Math.random() * 1080 + 1);
      }
    })

    //checking the x value of the flowers, making them go back to the start of the screen, keeping the game going, if they have gone off the screen
    this.flowerGroup.children.each(function (item) {
      //checking if the item has gone off the screen up, down or to the left
      if ((item.x < 0) || (item.y > 1080) || (item.y < 0)) {
        //resetting the x value to the start
        item.x = 1920;
        //picking a new random y value for when the sprite reappears
        item.y = Math.floor(Math.random() * 1080 + 1);
      }
    })
  }
}

export default gameScene
