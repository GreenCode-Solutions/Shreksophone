document.addEventListener("DOMContentLoaded", function() {
  if (completed("squares")) {
    window.location = "../index.html";
  }
  
  function completed(key) {
    if (localStorage.getItem(key + "Completed") == "true") {
      return true;
    }
    return false;
  }

  function decryptPass(pass) {
    pass = pass.split("")
    strpass = "";
    for (let i = 0; i < pass.length; i++) {
      pass.splice(i, 1);
    }
    for (let i = 0; i < pass.length; i++) {
      strpass += pass[i];
    }
    return strpass
  }

  let buttons = [];
  let positions = [];
  const numberOfButtons = 64;
  window.squaresPass = decryptPass(localStorage.getItem("squaresPass"));

  function makePositions() {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        positions.push({ x: x, y: y });
      }
    }
  }

  makePositions()
  positions = shuffleArray(positions);

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
    return array;
  }

  function removeElement(ele) {
    ele.parentNode.removeChild(ele);
  }

  function generateButtons() {
    for (let i = 0; i < numberOfButtons; i++) {
      let { x, y } = positions[i];

      let button = document.createElement("button");
      button.style.left = `calc(${100 * x / 8}vw)`;
      button.style.top = `calc(${100 * y / 8}vh)`;
      button.tabIndex = '-1';
      button.display = "none";

      buttons.push(new Button(x, y, button));
    }
    for (let i = 0; i < numberOfButtons; i++) {
      let shuffledButtons = shuffleArray(buttons);
      document.body.appendChild(shuffledButtons[i].buttonDOM);
    }

    addNewButtonTest();

  }

  function addNewButtonTest() {
    let { x, y } = positions.pop()
    let newButton;
    for (let i = 0; i < numberOfButtons; i++) {
      if (buttons[i].x == x && buttons[i].y == y) {
        newButton = buttons[i];
        break;
      }
    }
    newButton.buttonDOM.style.display = "auto";

  }

  function addNewButton() {
    if (positions.length === 0) {
      setTimeout(function() {
        endScreen();
      }, 1000);
      return;
    }

    let { x, y } = positions.pop();

    let button = document.createElement("button");
    button.style.left = `calc(${100 * x / 8}vw)`;
    button.style.top = `calc(${100 * y / 8}vh)`;
    button.tabIndex = '-1';

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

  function endScreen() {
    for (let i = 0; i < buttons.length; i++) {
      removeElement(buttons[i].buttonDOM); 
    }
    document.body.style.background = "black";
    let passwordElement = document.createElement("h1");
    let passwordNode = document.createTextNode(`${window.squaresPass}`);
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

  function resetButtons() {
    for (let i = 0; i < buttons.length; i++) {
      removeElement(buttons[i].buttonDOM); 
    }

    buttons = [];
    positions = [];
    makePositions();
    positions = shuffleArray(positions);
    addNewButton();

  }

  window.squaresPass = decryptPass(localStorage.getItem("squaresPass"));

  addNewButton();
});