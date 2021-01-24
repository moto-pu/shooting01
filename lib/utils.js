'use strict';

// make random integer
export const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
