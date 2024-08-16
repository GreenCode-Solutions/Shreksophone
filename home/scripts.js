document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", activateAnimation);
  });

  let levels = ['squares', 'circles', 'arrows'];
  if (completed("squares") && completed("circles") && completed("arrows")) {
    endScreen()
  }

  let squaresPassUserInput;
  document.getElementById("squaresPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      squaresPassUserInput = event.target.value;
      checkPassword("squares", squaresPassUserInput, window.squaresPass);
    }
  });

  let circlesPassUserInput;
  document.getElementById("circlesPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      circlesPassUserInput = event.target.value;
      checkPassword("circles", circlesPassUserInput, window.circlesPass);

    }
  });

  let arrowsPassUserInput;
  document.getElementById("arrowsPass").addEventListener("keydown", (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      arrowsPassUserInput = event.target.value;
      checkPassword("arrows", arrowsPassUserInput, window.arrowsPass);
    }
  });

  for (let i = 0; i < levels.length; i++) {
    if (completed(levels[i])) {
      let button = document.getElementById(levels[i] + "Button");
      button.parentNode.removeChild(button);

      let textBox = document.getElementById(levels[i] + "Pass");
      textBox.parentNode.removeChild(textBox);
    }
  }

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
  window.arrowsPass = getOrGeneratePassword("arrowsPass");

  function completed(key) {
    if (localStorage.getItem(key + "Completed") == "true") {
      return true;
    }
    return false;
  }

  function checkPassword(key, userInput, storedPass) {
    if (userInput === storedPass || completed(key)) {

      let button = document.getElementById(key + "Button");
      button.parentNode.removeChild(button);

      let textBox = document.getElementById(key + "Pass");
      textBox.parentNode.removeChild(textBox);

      localStorage.setItem(key + "Completed", true);
      if (completed("squares") && completed("circles") && completed("arrows")) {
        endScreen()
      }
    }
  }

  function endScreen() {
    window.location = "https://www.youtube.com/watch?v=pxw-5qfJ1dk";
    // let iframe = document.createElement("iframe");
    // iframe.src = "https://www.youtube.com/watch?v=pxw-5qfJ1dk";
    // document.body.appendChild(iframe);
  }

  console.log([window.squaresPass, window.circlesPass, window.arrowsPass]);

});