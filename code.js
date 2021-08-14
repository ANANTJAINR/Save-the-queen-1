var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["99c7c210-831e-47b2-bf31-856021bd9358","da2848ba-4006-4783-af63-0828c146a827","7af67aff-e243-4e89-9a93-d495898e300d"],"propsByKey":{"99c7c210-831e-47b2-bf31-856021bd9358":{"name":"bunny2_walk1_1","sourceUrl":"assets/api/v1/animation-library/gamelab/Q06Mtp7OA9HZ97lXOvJ7J59dO3jcjyLu/category_animals/bunny2_walk1.png","frameSize":{"x":152,"y":193},"frameCount":2,"looping":true,"frameDelay":2,"version":"Q06Mtp7OA9HZ97lXOvJ7J59dO3jcjyLu","categories":["animals","characters"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":304,"y":193},"rootRelativePath":"assets/api/v1/animation-library/gamelab/Q06Mtp7OA9HZ97lXOvJ7J59dO3jcjyLu/category_animals/bunny2_walk1.png"},"da2848ba-4006-4783-af63-0828c146a827":{"name":"turtle_1","sourceUrl":null,"frameSize":{"x":300,"y":146},"frameCount":1,"looping":true,"frameDelay":12,"version":"n6wH1BDoNHlieJmgZMZgjpO_awND2Y8z","categories":["animals"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":146},"rootRelativePath":"assets/da2848ba-4006-4783-af63-0828c146a827.png"},"7af67aff-e243-4e89-9a93-d495898e300d":{"name":"little_robot_1","sourceUrl":"assets/api/v1/animation-library/gamelab/sN2hjAr9KTf9BcPT52K1YA4BLkKyA53k/category_robots/little_robot.png","frameSize":{"x":161,"y":300},"frameCount":1,"looping":true,"frameDelay":2,"version":"sN2hjAr9KTf9BcPT52K1YA4BLkKyA53k","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":161,"y":300},"rootRelativePath":"assets/api/v1/animation-library/gamelab/sN2hjAr9KTf9BcPT52K1YA4BLkKyA53k/category_robots/little_robot.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");

//variable to store different state of game
var gameState = "serve";

// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

//score variables
var playerScore=0;
var compScore=0;

function draw() {
  //clear the screen
  background("green");
  
  if(gameState=="serve")
  {
         //display text
      textSize(18);
      fill ("maroon");
      text("Press Space to Strike",120,180);
      
      //serve the striker when space is pressed
      if (keyDown("space")) {
        serve();
         gameState="play";
      }
      
     
  }
  
 
  
  //display scores
  textSize(18);
  fill("maroon");
  text(compScore, 25,225);
  text(playerScore,25,185);
  
  // Score
  
     if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
   
      if(playerScore==5 || compScore==5)
      {
        fill("maroon");
        textSize(18);
        text("Game Over!",170,160);
      }
 
 
  
  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;

  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  
 
  drawSprites();
}



























function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
