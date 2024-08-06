document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button").addEventListener("click", activateAnimation);
  function activateAnimation(){
    document.getElementById("title").style.animation = "title 3s 1 forwards";
  }

});