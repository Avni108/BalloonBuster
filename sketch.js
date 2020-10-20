var PLAY = 1;
var END = 0;
var gameState = PLAY;


var sword,swordImage;
var fruit1,fruit2,fruit3,fruit4;
var monster,monsterImage;
var gameOver,gameOverImage;
var gameOverSound;
var knifeSwooshSound;
var gameOver,gameOverImage;
var score = 0;
var rand;


function preload(){
  
swordImage = loadImage("sword.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
gameOverImage = loadImage("gameover.png"); 
monsterImage = loadAnimation("alien1.png","alien2.png");
knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
gameOverSound = loadSound("gameover.mp3");  
  
 
}

function setup(){
createCanvas(600,400);  

 sword = createSprite(200,200,20,20);
 sword.addImage(swordImage);
 sword.scale = 0.7;
   
 fruitGroup = new Group();
 EnemyGroup = new Group(); 
  
}

function draw(){
createEdgeSprites();  
background(rgb(128,255,0));

text("Score: "+ score, 500,50);
  
 if(gameState===PLAY){
 sword.y = mouseY; 
 sword.x = mouseX;
   
 sword.depth = sword.depth+1;
   
 fruits();
 Enemy();
 
 if(fruitGroup.isTouching(sword)){ 
  fruitGroup.destroyEach();
   
  knifeSwooshSound.play(); 
  score = score+2; 
 }  
   
 gameState = PLAY; 
}
  
  if(EnemyGroup.isTouching(sword)){
   gameState = END;
   gameOverSound.play(); 
  }
  
   if(sword.isTouching(EnemyGroup)){
    gameState = END;  
    End();
    
   }
     
  
  
  drawSprites();
 
}
  
  function fruits(){
 if(frameCount%80===0){
  fruit = createSprite(600,200,20,20);
  fruit.scale = 0.2;
   
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1: fruit.addImage(fruit1);
    break;
    case 2: fruit.addImage(fruit2);
    break;
    case 3: fruit.addImage(fruit3);
    break;
    case 4: fruit.addImage(fruit4);
    break;
    default: break;
  }
   
   fruit.y = Math.round(random(50,340));
   
   fruit.velocityX = -7;
   
   fruit.setLifetime = 100;
   
   fruitGroup.add(fruit);
   
 }  
  }

  function Enemy(){
   if(frameCount%200===0){
   monster = createSprite(600,200,20,20);
   monster.addAnimation("moving",monsterImage);
   monster.y = Math.round(random(100,300));
   monster.velocityX = -8;
   monster.setLifetime = 50;
     
   EnemyGroup.add(monster);  
     
   } 
  }

   function End(){
   sword.addImage(gameOverImage);
   sword.x = 300;
   sword.y = 200;
   EnemyGroup.destroyEach();
   fruitGroup.destroyEach();  
   }

  
  


  

