import * as config from './config';
import { rand } from '../lib/utils';
import { key, jiki, camera, con, vcan, vcon } from './singleton';

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

document.onkeydown = e => {
  key[e.keyCode] = true;
};

document.onkeyup = e => {
  key[e.keyCode] = false;
};

const star = [];

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = rand(0, config.FIELD_W) << 8;
    this.y = rand(0, config.FIELD_H) << 8;
    this.vx = 0;
    this.vy = rand(30, 300);
    this.sz = rand(1, 2);
  }

  draw(cam) {
    const x = this.x >> 8;
    const y = this.y >> 8;

    if (
      x < cam.x ||
      x >= cam.x + config.SCREEN_W ||
      y < cam.y ||
      y >= cam.y + config.SCREEN_H
    ) {
      return;
    }

    vcon.fillStyle = rand(0, 2) !== 0 ? '#66f' : '#8af';
    vcon.fillRect(x, y, this.sz, this.sz);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > config.FIELD_H << 8) {
      this.reset();
    }
  }
}

function putInfo() {
  if (config.DEBUG) {
    drawCount++;
    if (lastTime + 1000 <= Date.now()) {
      fps = drawCount;
      drawCount = 0;
      lastTime = Date.now();
    }

    con.font = "20px 'Impact'";
    con.fillStyle = "white";
    con.fillText("FPS: " + fps, 20, 20);
  }
}

const updateAll = objArray => {
  for (const obj of objArray) {
    obj.update();
  }
};

const drawAll = objArray => {
  vcon.fillStyle = "black";
  const cam = camera.get();
  vcon.fillRect(cam.x, cam.y, config.SCREEN_W, config.SCREEN_H);

  for (const obj of objArray) {
    obj.draw(cam);
  }

  jiki.draw();

  const newCam = {
    x: (jiki.x >> 8) / config.FIELD_W * (config.FIELD_W - config.SCREEN_W),
    y: (jiki.y >> 8) / config.FIELD_H * (config.FIELD_H - config.SCREEN_H)
  };
  camera.set(newCam);

  con.drawImage(
    vcan,
    newCam.x,
    newCam.y,
    config.SCREEN_W,
    config.SCREEN_H,
    0,
    0,
    config.CANVAS_W,
    config.CANVAS_H
  );
};

const updateLoop = () => {
  updateAll(star);
};

const drawLoop = () => {
  drawAll(star);
  putInfo();
};

const gameInit = () => {
  for (let i = 0; i < config.STAR_MAX; ++i) {
    star[i] = new Star();
  }
  setInterval(updateLoop, config.GAME_SPEED);
  requestInterval(drawLoop, Math.floor(config.GAME_SPEED / 4));
};

window.onload = () => gameInit();
