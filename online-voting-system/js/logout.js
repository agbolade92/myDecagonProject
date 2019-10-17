$(document).ready(function(){
  $('.logout').click(() => logout());
  function logout(){
    localStorage.clear();
    window.location = 'index.html'
  }
})

