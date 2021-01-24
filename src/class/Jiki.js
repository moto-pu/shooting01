import * as config from '../config';
import {drawSprite} from './Sprite';
import {key} from '../singleton';

// my starship class
class Jiki {
  constructor() {
    this.x = (config.FIELD_W/2)<<8;
    this.y = (config.FIELD_H/2)<<8;
    this.speed = 1024;
    this.anime = 0;
  }
  update(){
    // console.log((FIELD_W<<8)-this.speed);
    // console.log(this.x);
    if (key[37] && this.x > this.speed) {
      this.x -= this.speed;
      if (this.anime > -8) --this.anime;
    } else if (key[39] && this.x <= (config.FIELD_W<<8)-this.speed) {
      this.x += this.speed;
      if (this.anime < 8) ++this.anime;
    } else {
      if (this.anime>0) this.anime-=2;
      if (this.anime<0) this.anime+=2;
    }

    if (key[38] && this.y > this.speed) this.y -= this.speed;
    if (key[40] && this.y <= (config.FIELD_H<<8)-this.speed) this.y += this.speed;
  }
  draw(){
    drawSprite(2 + (this.anime>>2), this.x, this.y);
  }
}

export default Jiki;