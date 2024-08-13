document.addEventListener("DOMContentLoaded", function() {

  let buttons = [];
  let positions = [];

  // Generate all possible positions and shuffle them
  function makePositions() {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        positions.push({ x: x, y: y });
      }
    }
  }
  makePositions()
  shuffleArray(positions);

  class Button {
    constructor(posX, posY, buttonDOM) {
      this.posX = posX;
      this.posY = posY;
      this.buttonDOM = buttonDOM;
    }
    get x() {
      return this.posX;
    }
    get y() {
      return this.posY;
    }
    get button() {
      return this.buttonDOM;
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function removeElement(ele) {
    ele.parentNode.removeChild(ele);
  }

  function addNewButton() {

    

    if (positions.length === 0) {
      setTimeout(function() {
        window.location = "../Level 2/main.html";
      }, 1000);
      return;
    }

    let { x, y } = positions.pop();
    // Take the first position from shuffled array
    let button = document.createElement("button");
    button.style.left = `calc(${100 * x / 8}vw)`;
    button.style.top = `calc(${100 * y / 8}vh)`;

    button.addEventListener("click", addNewButton);

    document.body.appendChild(button);
    buttons.push(new Button(x, y, button));

    if (buttons.length > 1) {
      let prevButton = buttons[buttons.length - 2].button;
      prevButton.removeEventListener("click", addNewButton);
      prevButton.addEventListener("click", resetButtons);

      document.body.style.backgroundColor = "green";
      setTimeout(function() {
        document.body.style.backgroundColor = "black";
      }, 1000);
      
    }

  }

  function resetButtons() {
    for (let i = 0; i < buttons.length; i++) {
      removeElement(buttons[i].button); 
    }

    buttons = [];
    positions = [];
    makePositions();
    
    shuffleArray(positions);
    addNewButton();

  }

  window.squaresPass = localStorage.getItem("squaresPass");
  console.log(window.squaresPass)
  addNewButton();
});
