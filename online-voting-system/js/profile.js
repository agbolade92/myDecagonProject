function makeTimer() {

	//		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
		var endTime = new Date("17 october 2019 1:09:00 GMT+01:00");			
			endTime = (Date.parse(endTime) / 1000);

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
      
      if(timeLeft < 0 ) { $('#timer').hide();
      endTime = 0;
      $.ajax({
        url:`http://localhost:3000/candidates`,
        type:'GET',
      dataType:'json',
      success:function(data){
        console.log(data);
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
        console.log(data[index].name)
      candidate = data[index].name
      $("#result").html(`<h1 class="display-4">The Winner is ${candidate}</h1>`);
   // $("#result-div").show();
  }})}
        
  }
  
  $("#result-div").hide();

  $("#timer").hide();

//setInterval(function() { makeTimer(); }, 1000);


$(document).ready(function(){

  // get username
  var id =localStorage.getItem('userID')
  $.ajax({
    url:`http://localhost:3000/voters/${id}`,
    type:'GET',
    dataType:'json',
      success:function(data){
      var name = data.name;
      $('#p-name').html(`<p>Welcome ${name} </p>`)
      
    }
  })


// populate table for candidate
  $.ajax({
    url:`http://localhost:3000/candidates`,
    type:'GET',
  dataType:'json',
  success:function(data){
    var candidate = ''
    data.forEach((person)=> {
      candidate+=`<tr><td>${person.name}</td>
      <td>${person.age}</td>
      <td>${person.sex}</td>
      <td><button class="btn btn-success" onclick=voteButton(${person.id})>Vote</button></td></tr>`
    })

    $('#candidate-table').append(candidate)
 }})

 // populate table for voters
 $.ajax({
  url:`http://localhost:3000/voters`,
  type:'GET',
dataType:'json',
success:function(data){
  var voter = ''
  data.forEach((person)=> {
    voter+=`<tr><td>${person.name}</td>
    <td>${person.age}</td>
    <td>${person.sex}</td>
    <td><button class="btn btn-success" onclick=voteButton(${person.id})>Vote</button></td><button class="btn btn-secondary" onclick=editButton(${person.id})>Edit</button></td><button class="btn btn-danger" onclick=deleteButton(${person.id})>Delete</button></td></tr>`
  })

  $('#voter-table').append(voter)
}})


})



// get winner

function getWinner(){
  $.ajax({
   url:`http://localhost:3000/candidates`,
   type:'GET',
 dataType:'json',
 success:function(data){
   console.log(data);
   var index
   var arr1 = []
   var highest = 0
   var candidate = ''
   data.forEach((person)=> {
     console.log(person.votes)
     arr1.push(Number(person.votes))
   })
   console.log(arr1);
   highest = Math.max(...arr1)
   console.log(highest);
   index = data.findIndex(function(person){
     return person.votes == highest
   })
   console.log(index);
   console.log(data[index].name)
   return data[index].name
 
 }})}

  function voteButton(id) {
    const options = {
      url:`http://localhost:3000/candidates/${id}`,
      type:'GET',
      dataType: 'json',
    };

    $.ajax(options).done((data) => {
      var votes = JSON.parse(data.votes)
      var votes1 = Number(votes)
    console.log(votes);
      votes1 = votes1 + 1
      console.log(votes1);
      var votes2 = JSON.stringify(votes1)
    
      const updatedData = {"name": data.name,
      "email": data.email,
      "password": data.password,
      "age": data.age,
      "sex": data.sex,
      "votes": votes2 };

      const options = {
        url:`http://localhost:3000/candidates/${id}`,
        type:'PUT',
        dataType: 'json',
        data: updatedData
        };
      $.ajax(options).done(() => alert('candidate voted successfully') )
})}


    function getWinner() {}


  // function deleteButton(id) {
  //   const options = {
  //     url:`http://localhost:3000/candidates/${id}`,
  //     type:'DELETE',
  //     dataType:'json',
  //   };
  //   $.ajax(options).done(() => {
  //     alert('candidate deleted successfully')
  //   })  
  // }

  // function editButton(id) {
  //   const options = {
  //     url:`http://localhost:3000/candidates/${id}`,
  //     type:'GET',
  //     dataType: 'json',
  //   };


  //   $.ajax(options).done((data) => {
  //     var name = data.name;
  //     var email = data.email;
  //     $('#edit-name').val(name)


  //     $('#edit-form').submit(function(e){
  //       e.preventDefault();
  //       var name = $('#edit-name').val();
  //       const updatedData = {"name": name,"email": email}
  //       const options = {
  //          url:`http://localhost:3000/candidates/${id}`,
  //           type:'PUT',
  //           dataType: 'json',
  //           data: updatedData
  //          };
  //        $.ajax(options).done(() => alert('candidate edited successfully') )
  //     })
  //     // const updatedData = {
  //     //   name: data.name,
  //     //   email: data.email,
  //     //   age: data.age,
  //     //   sex: data.sex,
  //     //   occupation: data.occupation,
  //     //   party: data.party,
  //     //   post: data.post,
  //     //   achievement: data.achievement
  //     // };

  //     // const options = {
  //     //   url:`http://localhost:3000/candidates/${id}`,
  //     //   type:'PUT',
  //     //   dataType: 'json',
  //     //   data: updatedData
  //     // };
  //     // $.ajax(options).done(() => alert('candidate edited successfully') )
  //   })
  // }
  
