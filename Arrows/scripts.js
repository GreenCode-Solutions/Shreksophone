document.addEventListener("DOMContentLoaded", function() {
  let arrows = [];
  let screenDimensions = [optimalGridSize().width, optimalGridSize().height];
  let pointsTo = [];
  let selectedStart = [];
  let positions = [];
  let imgDimensions = [calculateImageDimensions().widthImages, calculateImageDimensions().heightImages];

  console.log(imgDimensions[0] / imgDimensions[1]);
  console.log(screenDimensions);
  console.log([window.innerWidth, window.innerHeight])

  class Arrow {
    constructor(position = {x:x, y:y}, PointsTo = {x:x, y:y}, arrowDOM = null) {
      this.position = position;
      this.next = PointsTo;
      this.arrowDOM = arrowDOM;
    }

    compileTilt() {
      let tiltRad = Math.atan((this.position.x - this.next.x) / (this.position.y - this.next.y));
      let tiltDeg = tiltRad * (180 / Math.PI);
      if ((this.position.y - this.next.y) < 0) {
        tiltDeg -=180;
      }
      return -tiltDeg;

    }

    onClick() {
      if (pointsTo.length == 0) {
        selectedStart = this.position;
        pointsTo = this.next;
        this.arrowDOM.style.filter = "drop-shadow(0 0 0.75rem black)";
        this.arrowDOM.src = "../Image_Assets/arrowGreen.png";
        return;
      }

      if (this.position == selectedStart) {
        //endscreen();
        location.reload();
      }
      if (this.position != pointsTo) {
        location.reload()
        return;
      }
      
      pointsTo = this.next;
      
      this.arrowDOM.style.filter = "drop-shadow(0 0 0.75rem black)";
      this.arrowDOM.src = "../Image_Assets/arrowGreen.png";
      this.arrowDOM.style.zIndex = "4";

    }

    hover() {
      
    }

  }

  function endscreen() {

  }

  function optimalGridSize() {
    let bestFit = { width: 1, height: 1 };
    let bestImageRatio = Infinity;

    const maxImages = 50;
    const minImages = 20;

    for (let cols = 1; cols <= 10000 ; cols++) {
      let rows = Math.round(cols * (window.innerHeight / window.innerWidth));
      let arrowCount = cols * rows;

      if (arrowCount >= minImages && arrowCount <= maxImages) {
        let imageRatio = (window.innerWidth / cols) / (window.innerWidth / rows);


        if (Math.abs(1 - imageRatio) < bestImageRatio) {
          bestImageRatio = imageRatio;
          bestFit = { width: cols, height: rows };
        }
      }
    }

    return bestFit;
  }

  function calculateImageDimensions() { 
    let widthImages = window.innerWidth / screenDimensions[0];
    let heightImages = window.innerHeight / screenDimensions[1];
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
      let arrowDOM = document.createElement("img"); // switch to a p element for debug mode
      arrowDOM.classList.add('arrow');
      arrowDOM.style.left = `${imgDimensions[0] * positions[i].x}px`;
      arrowDOM.style.top = `${imgDimensions[1] * positions[i].y}px`;
      
      
      arrowDOM.src = "../Image_Assets/arrow.png";
      arrowDOM.style.width = `${imgDimensions[0]}px`;
      arrowDOM.style.height = `${imgDimensions[1]}px`;
      document.body.appendChild(arrowDOM);

      let nextPosition;
      if (i == positions.length - 1) {
        nextPosition = positions[0];
      } else {
        nextPosition = positions[i + 1];
      }

      let arrow = new Arrow(positions[i], nextPosition, arrowDOM);
      arrowDOM.style.transform = `rotate(${arrow.compileTilt()}deg)`;
      let node = document.createTextNode(`Position: ${positions[i].x}, ${positions[i].y}\n
        PointsTo: ${nextPosition.x}, ${nextPosition.y} \n
        Degrees: ${Math.round(arrow.compileTilt() * 100) / 100} \n
        slope: ${positions[i].y - nextPosition.y} / ${positions[i].x - nextPosition.x}`);

      arrowDOM.addEventListener('click', () => arrow.onClick());
      arrow.arrowDOM.appendChild(node);
      arrows.push(arrow);
    }
  }
  
  window.arrowsPass = localStorage.getItem("arrowsPass");
  console.log(window.arrowsPass)
  generateArrows();
});
