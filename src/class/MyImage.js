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

export default MyImage;