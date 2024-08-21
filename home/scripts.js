document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", activateAnimation);
  });
  function encryptPass(pass) {
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_=+0987654321!@#$%^&*()~<>?:;";
    pass = pass.split("")
    strpass = "";
    for (let i = 0; i < pass.length; i += 2) {
      pass.splice(i, 0, chars[Math.floor(Math.random() * chars.length)]);
    }
    for (let i = 0; i < pass.length; i++) {
      strpass += pass[i];
    }
    return strpass;
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

  let levels = ['squares', 'circles', 'arrows'];
  if (completed("squares") && completed("circles") && completed("arrows")) {
    endScreen();
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
    if (localStorage.getItem(key) == null) {
      let password = generateRandomPassword();
      localStorage.setItem(key, encryptPass(password));
      return password;
    }

    return decryptPass(localStorage.getItem(key));
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
        endScreen();
      }
    }
  }

  function endScreen() {
    let video = document.createElement("video");
    let source = document.createElement("source");
    source.src = "./Video_Assets/shreksophoneFinalVideo.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    video.loop = "true";

    document.body.appendChild(video);
    document.body.style.backgroundColor = "black";

    let title = document.getElementById("title");
    title.style.filter = "none";
    title.style.animation = "blink 4s linear infinite forwards";
    title.style.marginTop = "-15vh";

    let button = document.createElement("button");
    let text = document.createTextNode("Restart");
    button.appendChild(text);
    button.addEventListener("click", resetGame);

    let playButton = document.createElement("button");
    playButton.textContent = "Play Video";
    playButton.classList.add("button");
    

    playButton.addEventListener("click", function() {
      video.play().then(() => {
        playButton.style.display = "none";
        setTimeout(() => {
          document.body.appendChild(button);
        }, 15600);
      }).catch(error => {
        console.error("Video play failed", error);
      });
    });

    document.body.appendChild(playButton);

    button.classList.add("button");

    video.addEventListener("timeupdate", () => {
      if (video.currentTime >= 76.97) {
        video.currentTime = 15.670;
      }
    });
  }

  function resetGame() {
    localStorage.clear();
    location.reload()
  }

  console.log([window.squaresPass, window.circlesPass, window.arrowsPass])
});