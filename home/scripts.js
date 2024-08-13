document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", activateAnimation);
  });
  function activateAnimation(){
    document.getElementById("title").style.animation = "title 3s 1 forwards";
  }
  function generateRandomPassword() {
    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_=+0987654321!@#$%^&*()~<>?:;";
    const maxChars = 20;
    const minChars = 10;
    let passLength = Math.floor(Math.random() * (maxChars - minChars) + minChars)
    let password = ""
    for (let i = 0; i < passLength; i++) {
      password = password.concat(chars[Math.floor(Math.random() * chars.length)])
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
  console.log([window.squaresPass, window.circlesPass, window.arrowsPass])

});