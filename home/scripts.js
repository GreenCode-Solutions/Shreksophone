document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", activateAnimation);
  });
  function activateAnimation(){
    document.getElementById("title").style.animation = "title 3s 1 forwards";
  }

});