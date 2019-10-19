$(document).ready(function(){
  $('.logout').click(() => logout());
  function logout(){
    localStorage.setItem('userID', '');
    window.location = 'index.html'
  }
})

