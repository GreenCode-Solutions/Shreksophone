document.addEventListener("DOMContentLoaded", function() {
  let arrows = []
  let screenDimensions = []

  class Arrow {
    constructor(posX, posY, PointsTo = null, tilt, arrowDOM = null){
      this.posX = posX;
      this.posY = posY;
      this.next = PointsTo;
      this.tilt = tilt; 
      this.arrowDOM = arrowDOM
    }
  }

  function calculateElements() {
    const minElements = 40;
    const maxElements = 80;
    const maxRatio = 1.05;
    const minRatio = .95;
    
    // for (let i = 0; true; i++) {
      
    // }
  }
  
  const result = calculateElements();
  console.log(result);
  

});