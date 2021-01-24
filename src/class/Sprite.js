import * as config from '../config';
import MyImage from '../class/MyImage';
import {camera, vcon} from '../singleton';

const mySprite = new MyImage('asset/img/sprite.png');

// Sprite class
class Sprite {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

export const drawSprite = (snum, x, y)=>{
  const {x: sx, y: sy, w: sw, h: sh} = sprite[snum];
  const px = (x >> 8) - sw / 2;
  const py = (y >> 8) - sh / 2;
  const cam = camera.get();
  if (px + sw / 2 < cam.x || px - sw / 2 >= cam.x + config.SCREEN_W
    || py + sh / 2 < cam.y || py - sh / 2 >= cam.y + config.SCREEN_H) {
    return;
  }
  const image = mySprite.getImage();
  vcon.drawImage(image, sx, sy, sw, sh,
    px, py, sw, sh);
}

export default Sprite;

export const sprite = [
  new Sprite(  0, 0, 22, 42),
  new Sprite( 23, 0, 33, 42),
  new Sprite( 57, 0, 43, 42),
  new Sprite(101, 0, 33, 42),
  new Sprite(135, 0, 21, 42),
];