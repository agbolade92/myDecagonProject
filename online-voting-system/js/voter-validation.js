


$(document).ready(function() {
  $('#voter-form').submit(function(e) {
      e.preventDefault();
 // register form values
 var name = $('#name').val();
 var email = $('#email').val();
 var password = $('#password1').val();
 var confirmPassword = $('#password2').val();
 var age = $('#age').val();
 var sex = $('#sex').val();
 
 
 // regex verification
 var name_regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
 var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 var alphanumeric_regex = /^[a-zA-Z0-9]+$/
 // myData
 const myData = {
   "name": name,
   "email": email,
   "password": password,
   "age": age,
   "sex": sex,
     }

     const url = 'http://localhost:3000/voters'

     // checking for empty fields
     if (name.length == 0) {
      alert('* All fields are mandatory *');
      $('#name').focus();
    }
    //validating name field
    else if (!name.match(name_regex) || name.length == 0) {
    alert('*please use letters alone*');
    $('#name').focus();
    }
    //validating email field
    else if (!email.match(email_regex) || email.length == 0) {
      alert('*please enter a valid email*');
      $('#email').focus();
      return false;
    }

    // //validating password field
    else if ((password !== confirmPassword)) {
      alert('*please enter a valid password and confirm it*');
      $('#password').focus();
    }

    //validating age field
    else if (age < 19) {
      alert('*please enter age above 18*');
      $('#age').focus();
      return false;
     }
    //validating sex field
    else if (sex === 'null') {
      alert('*please select your sex*');
      $('#sex').focus();
    }
    
      else {
        $.ajax({
          url:url,
          type:"post",
          data:myData,
          success:function(data){
            alert('form submitted successfully')
          }})
      }
     


    })
  })
 

   
  