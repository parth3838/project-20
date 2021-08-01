var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, car_running, car_collided;
var road, invisibleRoad, roadImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver, gameOverImage;
var restart, restartImage;


function preload(){
  car_running = loadAnimation("car2.png","car3.png","car4.png","car5.png","car6.png");
  car_collided = loadAnimation("car_collided.png");
  
  roadImage = loadImage("road.png");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(500, 200);
  
  car = createSprite(50,10,20,50);
  car.addAnimation("running", car_running);
  car.addAnimation("collided" , car_collided)
  car.scale = 0.5;
  
  road = createSprite(200,190,800,20);
  road.addImage("road",roadImage);
  road.x = road.width /2;
  road.scale = 2;
  
  invisibleRoad = createSprite(200,160,400,10);
  invisibleRoad.visible = false;
  
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  car.setCollider("circle",0,0,10);
  car.debug = true;

  gameOver = createSprite(250,70,50,50);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.5;

  restart = createSprite(250,170,50,50);
  restart.addImage("restart",restartImage);
  restart.scale = 0.1;

  
  score = 0
}

function draw() {
  background(180);
  
  text("Score: "+ score, 400,50);

  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    road.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if (road.x < 0){
      road.x = road.width/2;
    }
    
   
    if(keyDown("space")&& car.y >=100) {
        car.velocityY = -13;
    }
 
    car.velocityY = car.velocityY + 0.8
  
    
    spawnClouds();
  
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(car)){
        gameState = END;
   }
  }
   else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      console.log("Restart is working");
      reset();
    }

      road.velocityX = 0;

      car.changeAnimation("collided", car_collided);

      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  
  car.collide(invisibleRoad);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,150,10,40);
   obstacle.velocityX = -6;
   
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
   
           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
  
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.10;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 180;
    
    
    cloud.depth = car.depth;
    car.depth = car.depth + 1;
    
   
   cloudsGroup.add(cloud);
    }
}


function reset(){
  gameState = PLAY;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;

  score = 0;

  car.changeAnimation("running", car_running);
  console.log;
}
