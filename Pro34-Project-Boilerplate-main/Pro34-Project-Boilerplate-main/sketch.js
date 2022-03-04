const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, vaccineBox,ground;
var vaccineBox_con;
var vaccineBox_con_2;
var vaccineBox_con_3;
var rope3;

var bg_img;
var food;
var hospital;

var helicopter,helicopter2,helicopter3;
var hospital_main;
var loading,check,error;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var error_sound;
var check_sound;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  hospital = loadImage('hospital-01.png');

  bk_song = loadSound('sound1.mp3');
  error_sound = loadSound("error.wav")
  cut_sound = loadSound('rope_cut.mp3');
  check_sound = loadSound('check_sound.mp3');


  loading = loadAnimation("loading_1.png.jpg","loading_2.png.jpg","loading_3.png.jpg","loading_4.png.jpg",
  "loading_5.png.jpg","loading_6.png.jpg","loading_7.png.jpg","loading_8.png.jpg","loading_9.png.jpg"
  ,"loading_10.png.jpg","loading_11.png.jpg","loading_12.png.jpg");
  
  check = loadAnimation("check_0.png" , "check_1.png","check_2.png","check_3.png","check_4.png");
  error = loadAnimation("error_1.png","error_2.png","error_3.png");
  
  loading.playing = true;
  check.playing = true;
  error.playing = true;
  error.looping= false;
  check.looping = false; 
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    crcheckeCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    crcheckeCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.crchecke();
  world = engine.world;

  //btn 1
  helicopter = crcheckeImg('cut_btn.png');
  helicopter.position(20,30);
  helicopter.size(50,50);
  helicopter.mouseClicked(drop);

   //btn 2
   helicopter2 = crcheckeImg('cut_btn.png');
   helicopter2.position(330,35);
   helicopter2.size(60,60);
   helicopter2.mouseClicked(drop2);
 
   //btn3
   helicopter3 = crcheckeImg('cut_btn.png');
   helicopter3.position(360,200);
   helicopter3.size(60,60);
   helicopter3.mouseClicked(drop3);

  mute_btn = crcheckeImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  loading.frameDelay = 20;
  check.frameDelay = 20;

  hospital_main = crcheckeSprite(170,canH-80,100,100);
  hospital_main.scale = 0.2;

  hospital_main.addAnimation('loadinging',loading);
  hospital_main.addAnimation('check',check);
  hospital_main.addAnimation('crying',error);
  hospital_main.changeAnimation('loadinging');
  
  vaccineBox = Bodies.rectangle(300,300,50,50);
  Matter.Composite.add(rope.body ,vaccineBox);

 vaccineBox_con = new Link(rope ,vaccineBox);
 vaccineBox_con_2 = new Link(rope2 ,vaccineBox);
 vaccineBox_con_3 = new Link(rope3 ,vaccineBox);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if (vaccineBox!=null){
    image(food ,vaccineBox.position.x ,vaccineBox.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(vaccineBox.collide(hospital_main) === true)
  {
    hospital_main.changeAnimation('check');
    check_sound.play();
  }

  if (vaccineBox!=null && vaccineBox.position.y>=650)
  {
    hospital_main.changeAnimation('crying');
    bk_song.stop();
    error_sound.play();
   vaccineBox=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
 vaccineBox_con.detach();
 vaccineBox_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
 vaccineBox_con_2.detach();
 vaccineBox_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
 vaccineBox_con_3.detach();
 vaccineBox_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world ,vaccineBox);
               vaccineBox = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}