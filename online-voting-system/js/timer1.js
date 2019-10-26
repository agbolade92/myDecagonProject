// TIMER FOR DEADLINE

$("#timer").hide();
  
$("#result-div").hide();

  var value
  var x
  $('#set-timer-submit').click((e) =>{
    e.preventDefault();
    var endTime

    value = $('#set-timer').val()
    if(value == ''){ return alert('you have not set deadline')}
    else{

    localStorage.setItem('value', value )}
    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
     x = setInterval(function(){
    endTime = new Date(value);
    //console.log(endTime);			
    endTime = (Date.parse(endTime) / 1000);
    //console.log(endTime);
    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;
    

    var days = Math.floor(timeLeft / 86400); 
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");	

    $("#timer").show();

    if(timeLeft <= 0 ) { $('#timer').hide();
    clearInterval(x)
    localStorage.setItem('value', '')
      showWinner()
      }}, 1000);
      $('#set-timer').val('');
      
   })
 
  
   $('#show-result').click((e) =>{
    $('#timer').hide()
    showWinner()
    $("#result-div").toggle()
     $('#set-timer').val('')
  })


   $('#reset-timer').click((e) =>{
     $('#timer').hide()
      value = '';
      localStorage.setItem('value','')
      clearInterval(x);
      $('#set-timer').val('')
   })
  
   
   function showWinner(){
   $.ajax({
    url:`http://localhost:3000/candidates`,
    type:'GET',
  dataType:'json',
  success:function(data){
    var index
    var arr1 = []
    var highest = 0
    var candidate
    data.forEach((person)=> {
      arr1.push(Number(person.votes))
    })
    highest = Math.max(...arr1)
    index = data.findIndex(function(person){
      return person.votes == highest
    })
    if(highest == 0){
      $("#result").html(`<h1 class="display-4 text-center">Election has not been done</h1>`)
    }else{
  candidate = data[index].name
  $("#result").html(`<h1 class="display-4 text-center">The Winner is ${candidate}</h1>`);}
  }})}

  



