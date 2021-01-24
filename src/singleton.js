import Jiki from './class/Jiki';
import Camera from './class/Camera';
import * as config from './config';

// status of keyboard
export const key = [];
export const jiki = new Jiki();

export const camera = new Camera(0, 0);

// canvas
const can = document.getElementById('can');
export const con = can.getContext('2d');
can.width = config.CANVAS_W;
can.height = config.CANVAS_H;

// field (virtual screen)
export const vcan = document.createElement('canvas');
export const vcon = vcan.getContext('2d');
vcan.width = config.FIELD_W;
vcan.height = config.FIELD_H;