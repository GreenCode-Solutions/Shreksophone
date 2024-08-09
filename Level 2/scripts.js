document.addEventListener("DOMContentLoaded", function() {
  let arrows = [];
  let screenDimensions = [Math.round(fractionAspectRatio().width * .015) , Math.round(fractionAspectRatio().height * .015)];
  
  let positions = [];
  let imgDimensions = [calculateImageDimensions().widthImages, calculateImageDimensions().heightImages];
  console.log(window.innerHeight);
  console.log(window.innerWidth)
  console.log(window.innerHeight)
  console.log(window.innerWidth)

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
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }

    const divisor = gcd(window.innerHeight, window.innerWidth);

    const width = window.innerWidth / divisor;
    const height = window.innerHeight / divisor;
    return { width, height }; 
  }

  function calculateImageDimensions() { 
    let widthImages = window.innerWidth/screenDimensions[0];
    let heightImages = window.innerHeight/screenDimensions[1];
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
      arrowDOM.classList.add('arrow');
      arrowDOM.style.left = `${imgDimensions[0] * positions[i].x}px`;
      arrowDOM.style.top = `${imgDimensions[1] * positions[i].y}px`;
      arrowDOM.src = "../Image_Assets/arrow.png";
      arrowDOM.style.width = `${imgDimensions[0]}px`;
      arrowDOM.style.height = `${imgDimensions[1]}px`;
      document.body.appendChild(arrowDOM);
      // if (arrows.length == 0) {
        arrows.push(new Arrow(positions[i].x, positions[i].y, [null, null], null, arrowDOM));
      // } else {
        
      // }
      
      
    }

  }
  
  generateArrows();
});