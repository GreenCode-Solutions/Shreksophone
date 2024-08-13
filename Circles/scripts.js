document.addEventListener("DOMContentLoaded", function() {
  const circles = [];
  let patternCount = 1;
  const possibleCoords = [];
  let pattern = []
  const gridSize = [optimalGridSize().width, optimalGridSize().height];
  const circleCount = gridSize[0] * gridSize[1];
  console.log(circles);
  let patternDisplaying = false;

  class Circle {
    constructor(posX, posY, circleDOM) {
      this.posX = posX;
      this.posY = posY;
      this.circleDOM = circleDOM;

      // Example onClick method, you can define your own logic
      this.circleDOM.addEventListener("click", () => this.onClick());
    }

    get x() {
      return this.posX;
    }

    get y() {
      return this.posY;
    }

    onClick() {
      if (patternDisplaying) {
        location.reload();
      }

      if (this.posX == pattern[0][0] && this.posY == pattern[0][1]) {
        pattern.splice(0, 1);
        if (pattern.length == 0) {
          patternCount++;
          if (patternCount >= circleCount) {
            endScreen();  // remember to add the password idea later
          }
          displayPattern(generatePattern());
        }
      } else {
        resetPattern();
      }


    }

    highlight() {
      this.circleDOM.style.animation = "none";
      this.circleDOM.style.animation = "highlight .5s ease-out 1 forwards";
    }
  }

  function optimalGridSize() {
    let bestFit = { width: 1, height: 1 };
    let bestImageRatio = Infinity;
    const maxCircles = 80;
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

  function endScreen() {
    window.location("../index.html");
  }

  function generateCircles() {
    const circleSize = (window.innerHeight + window.innerWidth) / (gridSize[0] * gridSize[1]) * 3;
    const horizontalSpacing = window.innerWidth / gridSize[0];
    const verticalSpacing = window.innerHeight / gridSize[1];
    console.log(circleSize);

    for (let i = 0; i < gridSize[0]; i++) {
      for (let j = 0; j < gridSize[1]; j++) {

        possibleCoords.push([i, j]);

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

  function randomArrayElement(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function generatePattern() {
    pattern = [];
    let avialibleCoords = possibleCoords;
    for (let i = 0; i < patternCount; i++) {
      let randCoord = randomArrayElement(avialibleCoords);
      pattern.push(randCoord);
      avialibleCoords.splice(avialibleCoords.indexOf(randCoord), 1);
    }
    console.log(pattern)
    return pattern;
  }

  function showPatternStep(pattern, index) {
    if (index >= pattern.length) {
      patternDisplaying = false;
      return;
    }

    const [x, y] = pattern[index];
    const circle = circles.find(c => c.x === x && c.y === y);

    if (circle) {
      circle.highlight();
      setTimeout(() => showPatternStep(pattern, index + 1), 500);
    }
  }

  function displayPattern(pattern) {
    patternDisplaying = true;
    showPatternStep(pattern, 0);
  }

  function resetPattern() {
    patternDisplaying = false;
    patternCount = 1;
    pattern = []; // Clear the current pattern
    circles.forEach(circle => circle.circleDOM.style.animation = "none"); // Clear all animations
    displayPattern(generatePattern()); // Restart with a new pattern
  }
  

  generateCircles();
  window.circlesPass = localStorage.getItem("circlesPass");
  console.log(window.circlesPass)
  setTimeout(() => displayPattern(generatePattern()), 2000);

});
