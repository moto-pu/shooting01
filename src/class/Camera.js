class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get() {
    return {x: this.x, y: this.y};
  }
  set(val) {
    const {x, y} = val;
    this.x = x;
    this.y = y;
  }
}

export default Camera;