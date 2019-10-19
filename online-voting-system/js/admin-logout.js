$(document).ready(function(){
  $('.logout').click(() => logout());
  function logout(){
    localStorage.setItem('adminID', '');
    window.location = 'index.html'
  }
})

