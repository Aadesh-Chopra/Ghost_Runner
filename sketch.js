var gameState = "play";
var ghost, door, climber, invisibleBlock;
var standingImage, jumpingImage, doorImg, climberImg;
var tower, towerImg;
var doorsGroup, climbersGroup, invisibleBlockGroup;
var spookySound;

function preload(){
  standingImage = loadImage("ghost-standing.png");
  jumpingImage = loadImage("ghost-jumping.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("standing", standingImage);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw(){
  background(0);
  
  if(gameState==="play"){
    spookySound.loop();
  if(keyDown("space")){
    ghost.velocityY = -10;
    
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  if(tower.y>400){
    tower.y = 300;
    
    
  }
  
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  
    drawSprites();
  }
  
    if (gameState === "end"){
      
      textSize(30);
      fill("yellow");
      stroke("yellow");
      text("game over", 230, 250);
    }
}



    function spawnDoors(){
      if(frameCount % 240===0){
        var door = createSprite(200, -50);
        
        var climber = createSprite(200, 10);
        var invisibleBlock = createSprite(200, 15);
        
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        
        door.x = Math.round(random(120, 400));
        climber.x = door.x;
        invisibleBlock.x = door.x;
        
        door.addImage(doorImg);
        climber.addImage(climberImg);
        
        door.velocityY = 1;
        climber.velocityY = 1;
        invisibleBlock.velocityY = 1;
        
        ghost.depth = door.depth;
        ghost.depth = ghost.depth+1;
        
        door.lifetime = 800;
        climber.lifetime = 800;
        invisibleBlock.lifetime = 800;
        
        doorsGroup.add(door);
        invisibleBlock.debug = true;
        climbersGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);
      }
    }
    
    
    
    
    
    
    
    