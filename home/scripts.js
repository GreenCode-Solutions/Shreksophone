document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", activateAnimation);
  });

  let squaresPassUserInput;
  document.getElementById("squaresPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      squaresPassUserInput = event.target.value;
      checkPassword("squaresButton", squaresPassUserInput, window.squaresPass);
    }
  });

  let circlesPassUserInput;
  document.getElementById("circlesPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      circlesPassUserInput = event.target.value;
      checkPassword("circlesButton", circlesPassUserInput, window.circlesPass);

    }
  });

  let arrowsPassUserInput;
  document.getElementById("arrowsPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      arrowsPassUserInput = event.target.value;
      checkPassword("arrowsButton", arrowsPassUserInput, window.arrowsPass);
    }
  });

  function activateAnimation(){
    document.getElementById("title").style.animation = "title 3s 1 forwards";
  }
  
  function generateRandomPassword() {
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_=+0987654321!@#$%^&*()~<>?:;";
    const maxChars = 12;
    const minChars = 10;
    let passLength = Math.floor(Math.random() * (maxChars - minChars) + minChars);
    let password = "";
    for (let i = 0; i < passLength; i++) {
      password = password.concat(chars[Math.floor(Math.random() * chars.length)]);
    }
    return password;
  }
  function getOrGeneratePassword(key) {
    let password = localStorage.getItem(key);
    if (!password) {
      password = generateRandomPassword();
      localStorage.setItem(key, password);
    }
    return password;
  }

  window.squaresPass = getOrGeneratePassword("squaresPass");
  window.circlesPass = getOrGeneratePassword("circlesPass");
  window.arrowsPass = getOrGeneratePassword("ArrowsPass");

  function checkPassword(key, userInput, storedPass) {
    if (userInput === storedPass) {
      console.log(`You got ${key} correct!`);
      button = document.getElementById(key)
      button.textContent = "\u00A0";
      image = document.createElement("img")
      image.src = "./Image_Assets/arrow.png";
      button.appendChild(image)
    };
  }
  console.log([window.squaresPass, window.circlesPass, window.arrowsPass]);

});