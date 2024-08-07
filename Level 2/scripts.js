document.addEventListener("DOMContentLoaded", function() {
  let arrows = [];
  let screenDimensions = [];

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }


  class Arrow {
    constructor(posX, posY, PointsTo = null, tilt, arrowDOM = null){
      this.posX = posX;
      this.posY = posY;
      this.next = PointsTo;
      this.tilt = tilt; 
      this.arrowDOM = arrowDOM;
    }
  }

  function fractionAspectRatio() {
    const divisor = gcd(Math.round(screen.availHeight / 10) * 10, Math.round(screen.availWidth / 10) * 10);
    const width = screen.availWidth / divisor;
    const height = screen.availHeight / divisor;
    return {width, height};
  }
  function calculateImageHeightWidth() {
    const minElements = 40;
    const maxElements = 80;
    const maxRatio = 1.05;
    const minRatio = .95;
    const {width, height} = fractionAspectRatio();
    let   {widthImages, heightImages} = 0;  
    let correctRatio = false;

    for (let i = 0; correctRatio == false; i++) {
      widthImages = screen.availWidth/width;
      heightImages = screen.availHeight/height;
      if (maxRatio > widthImages/heightImages > minRatio && minElements < width*height < maxElements) {
        correctRatio = true;
      }
    }

    return{ widthImages, heightImages };
  }
  
  const result = calculateImageHeightWidth();
  console.log(result);
  
  

});