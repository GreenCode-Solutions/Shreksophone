document.addEventListener("DOMContentLoaded", function() {
  let arrows = [];
  let screenDimensions = [fractionAspectRatio()[0],fractionAspectRatio()[1]];
  let positions = [];
  let imgDimensions = [calculateImageDimensions()[0], calculateImageDimensions()[1]];


  class Arrow {
    constructor(X, Y, PointsTo = [null, null], tilt = null, arrowDOM){
      this.posX = X;
      this.posY = Y;
      this.next = PointsTo;
      this.tilt = tilt; 
      this.arrowDOM = arrowDOM;
    }
  }

  function fractionAspectRatio() {  
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }

    const divisor = gcd(screen.availHeight, screen.availWidth);
    const width = screen.availWidth / divisor;
    const height = screen.availHeight / divisor;
    return { width, height }; 
  }

  function calculateImageDimensions() {
    const {width, height} = fractionAspectRatio();
    let   {widthImages, heightImages} = 0;  
    widthImages = screen.availWidth/width;
    heightImages = screen.availHeight/height;
    return { widthImages, heightImages };
  }
  
  function makePositions() {
    for (let x = 0; x < screenDimensions[0]; x++) {
      for (let y = 0; y < screenDimensions[1]; y++) {
        positions.push({ x: x, y: y });
      }
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(positions);
  }

  function generateArrows() {
    makePositions();
    for (let i = 0; i < positions.length; i++) {
      let arrowDOM = document.createElement("img")
      arrowDOM.class = 'arrow';
      arrowDOM.style.left = `${imgDimensions[0] * positions[i][0]}px`;
      arrowDOM.style.top = `${imgDimensions[1] * positions[i][1]}px`;
      if (arrows.length == 0) {
        arrows.push(new Arrow(X=positions[i][0], Y=positions[i][1], arrowDOM=arrowDOM));
      } else {
        
      }
      
      
    }

  }

  const result = calculateImageDimensions();
  console.log(result);
  generateArrows();
});