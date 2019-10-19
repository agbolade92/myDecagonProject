$(document).ready(function(){
  $('#admin-login-form').submit(function(e){ 
    e.preventDefault()
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url:`http://localhost:3000/admin?username=${username}&&password=${password}`,
    type:'GET',
    success:function(data){
      var id = data.map((user)=> user.id)
      localStorage.setItem('adminID',Number(id));
      window.location = 'admin-page.html'

    }
  })
  
  })

})