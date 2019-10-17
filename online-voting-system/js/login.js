$(document).ready(function(){
  $('#login-form').submit(function(e){ 
    e.preventDefault()
  var email = $('#email').val();
  var password = $('#password').val();
  $.ajax({
    url:`http://localhost:3000/voters?email=${email}&&password=${password}`,
    type:'GET',
    success:function(data){
      var id = data.map((user)=> user.id)
      localStorage.setItem('userID',Number(id));
      window.location = 'voter-profile.html'

    }
  })
  
  })


})