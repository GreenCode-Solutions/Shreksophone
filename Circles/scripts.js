document.addEventListener("DOMContentLoaded", function() {
  if (completed("circles")) {
    window.location = "../index.html";
  }

  function completed(key) {
    if (localStorage.getItem(key + "Completed") == "true") {
      return true;
    } 
    return false;
  }
 
  const circles = [];
  let patternCount = 1;
  const possibleCoords = [];
  let pattern = [];
  const gridSize = [optimalGridSize().width, optimalGridSize().height];
  const circleCount = gridSize[0] * gridSize[1];
  let patternDisplaying = false;
  window.circlesPass = decryptPass(localStorage.getItem("circlesPass")); 

  class Circle {
    constructor(posX, posY, circleDOM) {
      this.posX = posX;
      this.posY = posY;
      this.circleDOM = circleDOM;

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
        return
      }

      if (this.posX == pattern[0][0] && this.posY == pattern[0][1]) {
        pattern.splice(0, 1);
        if (pattern.length == 0) {
          patternCount++;
          if (patternCount - 1 >= circleCount) {
            endScreen(); 
          } else {
            displayPattern(generatePattern());
          }
        }
      } else {
        resetPattern();
      }
    }

    highlight() {
      this.circleDOM.style.animation = "none";
      this.circleDOM.offsetHeight;
      this.circleDOM.style.animation = "highlight .5s ease-out 1 forwards";
    }
  }

  function optimalGridSize() {
    let bestFit = { width: 1, height: 1 };
    let bestImageRatio = Infinity;
    const maxCircles = 50;
    const minCircles = 30;

    for (let cols = 1; cols <= maxCircles; cols++) {
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

  function removeElement(ele) {
    ele.parentNode.removeChild(ele);
  }

  function decryptPass(pass) {
    pass = pass.split("");
    strpass = "";
    for (let i = 0; i < pass.length; i++) {
      pass.splice(i, 1);
    }
    for (let i = 0; i < pass.length; i++) {
      strpass += pass[i];
    }
    return strpass;
  }

  function endScreen() {
    for (let i = 0; i < circles.length; i++) {
      removeElement(circles[i].circleDOM);
    }
    document.body.style.background = "black";
    let passwordElement = document.createElement("h1");
    let passwordNode = document.createTextNode(`${window.circlesPass}`);
    passwordElement.appendChild(passwordNode);
    document.body.appendChild(passwordElement);

    setInterval(() => {
      if (document.body.style.backgroundColor === 'black') {
        document.body.style.backgroundColor = 'green';
      } else {
        document.body.style.backgroundColor = 'black';
      }
    }, 1500);
    setTimeout(() => {
      window.location = "../index.html"
    }, 8900 );
  }

  function generateCircles() {
    const horizontalSpacing = window.innerWidth / gridSize[0];
    const verticalSpacing = window.innerHeight / gridSize[1];
    const circleSize = Math.min(horizontalSpacing, verticalSpacing) * 0.8;

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
    let avialibleCoords = [...possibleCoords];

    for (let i = 0; i < patternCount; i++) {
      let randCoord = randomArrayElement(avialibleCoords);
      pattern.push(randCoord);
      avialibleCoords.splice(avialibleCoords.indexOf(randCoord), 1);
    }
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
    pattern = []; 
    displayPattern(generatePattern())
  }
  

  generateCircles();
  setTimeout(() => displayPattern(generatePattern()), 2000);

});