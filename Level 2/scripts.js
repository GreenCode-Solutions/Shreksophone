document.addEventListener("DOMContentLoaded", function() {
  const circles = [];
  let patternCount = 0;
  const gridSize = [optimalGridSize().width, optimalGridSize().height];

  class Circle {
    constructor(posX, posY, circleDOM) {
      this.posX = posX;
      this.posY = posY;
      this.circleDOM = circleDOM;

      // Example onClick method, you can define your own logic
      this.circleDOM.addEventListener("click", () => this.onClick());
    }

    onClick() {

    }
  }

  function optimalGridSize() {
    let bestFit = { width: 1, height: 1 };
    let bestImageRatio = Infinity;

    const maxCircles = 70;
    const minCircles = 60;

    for (let cols = 1; cols <= 100; cols++) {
      let rows = Math.round(cols * (window.innerHeight / window.innerWidth));
      let circleCount = cols * rows;

      if (circleCount >= minCircles && circleCount <= maxCircles) {
        let imageRatio = (window.innerWidth / cols) / (window.innerHeight / rows);

        if (Math.abs(1 - imageRatio) < bestImageRatio) {
          bestImageRatio = imageRatio;
          bestFit = { width: cols, height: rows };
        }
      }
    }

    return bestFit;
  }

  function generateCircles() {
    const circleSize = (window.innerHeight + window.innerWidth) / (gridSize[0] * gridSize[1]) * 2.5;
    const horizontalSpacing = window.innerWidth / gridSize[0];
    const verticalSpacing = window.innerHeight / gridSize[1];

    for (let i = 0; i < gridSize[0]; i++) {
      for (let j = 0; j < gridSize[1]; j++) {
        let circle = document.createElement("div");
        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize}px`;
        circle.style.borderRadius = '50%';

        // Calculate the position based on grid size and spacing
        circle.style.left = `${i * horizontalSpacing + (horizontalSpacing - circleSize) / 2}px`;
        circle.style.top = `${j * verticalSpacing + (verticalSpacing - circleSize) / 2}px`;

        document.body.appendChild(circle);

        circles.push(new Circle(i, j, circle));
      }
    }
  }

  generateCircles();

  function generatePattern() {
    // Your pattern generation logic here
  }
});
