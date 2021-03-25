//Create variables here
var dog,happyDog;
var dogImg,happyDogImg,hungryImg,sadImg;
var database;
var foodS,foodStock;
var milk;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
var changeState,readState;
var bedroomImg,washroomImg,gardeImg;
function preload()
{
	//load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/happydog.png");
  hungryImg=loadImage("images/doglmg.png");
  milk=loadImage("images/Milk.png")
  bedroomImg=loadImage("virtual pet images/Bed Room.png");
  washroomImg=loadImage("virtual pet images/Wash Room.png");
  gardenImg=loadImage("virtual pet images/Garden.png");
  sadImg=loadImage("images/Dog.png");
  
}

function setup() {
	createCanvas(500, 500);

  dog=createSprite(400,150,20,20);
  dog.addImage("dogImg");

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  obj=new Food(200,180,10,20);
feed=createButton("FEED THE DOG");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("ADD FOOD");
addFood.position(700,95);
addFood.mousePressed(addFoods);

//read game state from database

readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();

});

//update game state

function update(state){
  database.ref('/').update({
    gameState:state
  });
}

}


function draw() {  
background(46,139,87);
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data) {
lastFed=data.val();
})

fill(255,255,254);
textSize(15);

if("LAST FED:"+lasFed%12+"PM",350,30);

else if(lastFed==0){
  text ("Last Feed:12Am",350,30);
}
else{
  text("lastFeed :"+lastFed+"AM",350,30);
}

function feedDog(){
  happyDog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getStock(),
    FeedTime:hour ()
  })
}

washroom();
garden();
bedroom();

currentTime_hour();

if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)){
update("Bathing");
foodObj.washroom();
}else{
  update("Hungry");
  foodObj.display();
}

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove()
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadImg);
}



  drawSprites();
  //add styles here
text ("PRESS UP ARROW TO FEED THE DOG")
textSize(20);
fill ("white");
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}


