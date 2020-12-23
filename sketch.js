var dog, dogImg; 
var happyDog, happyDogImg;
var database;
var foodS, foodStock;

function preload () {
  dogImg      = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup () {

  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250, 350, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw () { 
  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDogImg);
  }

  drawSprites();

  textSize(19);
  fill("white");
  stroke("black");
  text("NOTE: Press UP_ARROW Key To Feed The Drago Milk!", 14, 25);
  text("Food Remaining : " + foodS, 100, 200);

}

//Function to read values from DataBase
function readStock (data) {
  foodS = data.val ();
}

//Function to write values in DataBase
function writeStock (x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1
  }
  database.ref('/').update({
    Food:x
  })
}