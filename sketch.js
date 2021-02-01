var balloon,bAnima;
var database,height;

function preload(){
   bAnima = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png",
   "Hot Air Ballon-04.png");
   bg = loadImage("Hot Air Ballon-01.png");
}
function setup() {
  createCanvas(800,500);

  balloon = createSprite(250,380,50,50);
  balloon.addAnimation("balloon",bAnima);
  balloon.scale = 0.4;

  database = firebase.database();
  

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight,showError);
}

function draw() {
  background(bg);

 if (height !== undefined){
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.y  = balloon.y -10;
    balloon.scale = balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.scale = balloon.scale +0.005;
  }

drawSprites();

fill(0);
stroke("white");
textSize(25);
text("**Use arrow keys to move Hot Air Balloon!",40,40);
 };
  
  }


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+ x,
    'y': height.y + y,
  })
}


function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error!!!!!! Check Again the Whole Code");
}