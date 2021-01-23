// speed of game (frame rate) [ms]
const GAME_SPEED = 1000/60;

// screen size
const SCREEN_W = 225;
const SCREEN_H = 400;
// canvas size
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H* 2;
// field size
const FIELD_W = SCREEN_W * 2;
const FIELD_H = SCREEN_H * 2;

// number of stars
const STAR_MAX = 300;

// status of keyboard
const key = [];

// on pressing key
document.onkeydown = e=>{
  key[e.keyCode] = true;
}

// on releasing key
document.onkeyup = e=>{
  key[e.keyCode] = false;
}


// my starship class
class MyStarship {
  constructor() {
    this.x = (FIELD_W/2)<<8;
    this.y = (FIELD_H/2)<<8;
    this.speed = 1024;
    this.anime = 0;
  }
  update(){
    // console.log((FIELD_W<<8)-this.speed);
    // console.log(this.x);
    if (key[37] && this.x > this.speed) {
      this.x -= this.speed;
      if (this.anime > -8) --this.anime;
    } else if (key[39] && this.x <= (FIELD_W<<8)-this.speed) {
      this.x += this.speed;
      if (this.anime < 8) ++this.anime;
    } else {
      if (this.anime>0) this.anime-=2;
      if (this.anime<0) this.anime+=2;
    }

    if (key[38] && this.y > this.speed) this.y -= this.speed;
    if (key[40] && this.y <= (FIELD_H<<8)-this.speed) this.y += this.speed;
  }
  draw(){
    drawSprite(2 + (this.anime>>2), this.x, this.y);
  }
}

const jiki = new MyStarship();

// my Image class
class MyImage {
  constructor(fileName) {
    this.isReady=false;
    this.image = new Image();
    this.image.src = fileName;
    this.image.onload = ()=>{
      this.isReady = true;
    }
    this.image.onerror = e=>{
      console.error(e);
    }
  }
  getImage() {
    if (!this.isReady) {
      console.error('image is not ready');
      return;
    }
    return this.image;
  }

}
// read file
const spriteImage = new MyImage('sprite.png');

// Sprite class
class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

// draw sprite
const drawSprite = (snum, x, y) => {
  const {x:sx, y:sy, w:sw, h:sh} = sprite[snum];
  const px = (x>>8) - sw/2;
  const py = (y>>8) - sh/2;
  if (   px+sw/2 < camera_x || px-sw/2 >= camera_x + SCREEN_W
      || py+sh/2 < camera_y || py-sh/2 >= camera_y + SCREEN_H ) {
    return;
  }
  vcon.drawImage(spriteImage.getImage(),  sx,sy,sw,sh,
      px,py, sw,sh);
}

// sprite
const sprite = [
  new Sprite(  0, 0, 22, 42),
  new Sprite( 23, 0, 33, 42),
  new Sprite( 57, 0, 43, 42),
  new Sprite(101, 0, 33, 42),
  new Sprite(135, 0, 21, 42),
]

// canvas
const can = document.getElementById('can');
const con = can.getContext('2d');
can.width = CANVAS_W;
can.height = CANVAS_H;

// field (virtual screen)
const vcan = document.createElement('canvas');
const vcon = vcan.getContext('2d');
vcan.width = FIELD_W;
vcan.height = FIELD_H;

// position of camera
let camera_x = 0;
let camera_y = 0;

// Instance of stars
const star = [];

// make random integer
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Star class
class Star {
  constructor() {
    this.x = rand(0, FIELD_W) << 8;
    this.y = rand(0, FIELD_H) << 8;
    this.vx = 0;
    this.vy = rand(30, 300);
    this.sz = rand(1,2);
  }

  draw() {
    const x = this.x>>8;
    const y = this.y>>8;
    if (   x < camera_x || x >= camera_x + SCREEN_W
        || y < camera_y || y >= camera_y + SCREEN_H ) {
      return;
    }
    vcon.fillStyle = rand(0,2)!=0 ? '#66f' : '#8af';
    vcon.fillRect(x, y, this.sz, this.sz);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > FIELD_H<<8) {
      this.y = 0;
      this.x = rand(0, FIELD_W)<<8;
    }

  }
}



// game loop
const gameLoop = ()=>{
  // move processing
  for (let i = 0; i < STAR_MAX; ++i) {
    star[i].update();
  }
  jiki.update();

  // draw processing
  vcon.fillStyle="black";
  vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);

  for (let i = 0; i < STAR_MAX; ++i) {
    star[i].draw();
  }
  jiki.draw();

  // range of my starship is from 0 to FIELD_W
  // range of camera is from 0 to (FIELD_W-SCREEN_W)
  camera_x = (jiki.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
  camera_y = (jiki.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);

  // copy contents from virtual screen to actual canvas
  con.drawImage(vcan, camera_x,camera_y,SCREEN_W, SCREEN_H,
  0,0, CANVAS_W, CANVAS_H);
};

// Initialize
const gameInit = ()=> {
  for (let i = 0; i < STAR_MAX; ++i) {
    star[i] = new Star();
  }
  setInterval(gameLoop, GAME_SPEED);
};

window.onload = ()=>gameInit();