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


function preload() {
  bg = loadImage("assets/background.png");
  melon = loadImage("assets/melon.png");
  rabbit1 = loadImage("assets/sad_1.png");
  blink = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png")
  sadbunny = loadAnimation("assets/sad_2.png", "assets/sad_3.png")
  eatbunny = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png",)

  blink.playing = true;
  blink.looping = true;

  eatbunny.playing = true;
  eatbunny.looping = false;

  sadbunny.playing = true;
  sadbunny.looping = false;

  air = loadSound("assets/air.wav");
  sad = loadSound("assets/sad.wav");
  ropecut = loadSound("assets/rope_cut.mp3")
  eat = loadSound("assets/eating_sound.mp3");
  bgsong = loadSound("assets/sound1.mp3")



}


function setup() {
  var mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (mobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);

  }

  engine = Engine.create();
  world = engine.world;

  bgsong.play();
  bgsong.setVolume(0.1);


  sadbunny.frameDelay = 20;
  blink.frameDelay = 20;
  eatbunny.frameDelay = 20;

  ground = new Ground(200, canH, canW + 1150, 20);

  rope = new Rope(8, { x: 40, y: 30 });

  rope2 = new Rope(7, { x: 370, y: 40 })

  rope3 = new Rope(4, { x: 400, y: 220 })

  var fruitOptions = {
    density: 0.001
  }

  bunny = createSprite(320, canH - 70, 100, 100);

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eatbunny);
  bunny.addAnimation("sad", sadbunny);

  bunny.changeAnimation("blinking");



  bunny.scale = 0.2;

  fruit = Bodies.circle(300, 300, 20);


  Matter.Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);
  fruitCon2 = new Link(rope2, fruit);
  fruitCon3 = new Link(rope3, fruit);

  cutbutton = createImg("assets/cut_btn.png");
  cutbutton.position(20, 30);
  cutbutton.size(50, 50);
  cutbutton.mouseClicked(drop);

  cutbutton2 = createImg("assets/cut_btn.png");
  cutbutton2.position(330, 35);
  cutbutton2.size(60, 60);
  cutbutton2.mouseClicked(drop2);

  cutbutton3 = createImg("assets/cut_btn.png");
  cutbutton3.position(360, 200);
  cutbutton3.size(60, 60);
  cutbutton3.mouseClicked(drop3);

  airBlower = createImg("assets/balloon.png");
  airBlower.position(10, 250);
  airBlower.size(100, 80);
  airBlower.mouseClicked(airblow);

  mute = createImg("assets/mute.png");
  mute.position(450, 50);
  mute.size(50, 50);
  mute.mouseClicked(muteSound);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  // imageMode(CENTER);
  textSize(50);

}

function draw() {
  background(50);
  image(bg, 0, 0, displayWidth + 80, displayHeight);


  if (fruit != null) {
    image(melon, fruit.position.x, fruit.position.y, 70, 70);
  }

  Engine.update(engine);
  ground.display();
  rope.show();
  rope2.show();
  rope3.show();
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
    eat.play();
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("sad");
    sad.play();
  }
  drawSprites();
}

function drop() {
  ropecut.play();
  rope.break();
  fruitCon.detach();
  fruitCon = null;

}
function drop2() {
  ropecut.play();
  rope2.break();
  fruitCon2.detach();
  fruitCon3 = null;

}
function drop3() {
  ropecut.play();
  rope3.break();
  fruitCon3.detach();
  fruitCon3 = null;

}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d <= 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;

    } else {
      return false;
    }
  }
}

function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  air.play();
}

function muteSound() {
  if (bgsong.isPlaying()) {
    bgsong.stop();

  } else {
    bgsong.play();
  }
}




