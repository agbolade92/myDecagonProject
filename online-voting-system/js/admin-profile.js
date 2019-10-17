


function makeTimer() {

    $('#deadline-submit').click((e) =>{
      e.preventDefault();
      var endTime
      var value = $('#deadline').val()
      //console.log(value)
      //setInterval(function() {  endTime = new Date(value)}, 1000);
     // localStorage.setItem('value',JSON.stringify(value))

     
      endTime = new Date(value);
      //console.log(endTime);			
			endTime = (Date.parse(endTime) / 1000);
      console.log(endTime);
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
    })
   // console.log(value);
    //setInterval(function() {endTime = new Date(value);}, 1000);
	//		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
      
      
  //     if(timeLeft < 0 ) { $('#timer').hide();
  //     endTime = 0;
  //     $.ajax({
  //       url:`http://localhost:3000/candidates`,
  //       type:'GET',
  //     dataType:'json',
  //     success:function(data){
  //       console.log(data);
  //       var index
  //       var arr1 = []
  //       var highest = 0
  //       var candidate 
  //       data.forEach((person)=> {
  //         arr1.push(Number(person.votes))
  //       })
  //       highest = Math.max(...arr1)
  //       index = data.findIndex(function(person){
  //         return person.votes == highest
  //       })
  //       console.log(data[index].name)
  //     candidate = data[index].name
  //     $("#result").html(`<h1 class="display-4">The Winner is ${candidate}</h1>`);
  //  // $("#result-div").show();
  // }})}
        
  }
  
 // $("#result-div").hide();

  $("#timer").show();

setInterval(function() { makeTimer(); }, 1000);





$(document).ready(function(){

  // get username
  var id =localStorage.getItem('userID')
  $.ajax({
    url:`http://localhost:3000/admin/${id}`,
    type:'GET',
    dataType:'json',
      success:function(data){
      var name = data.name;
      $('#p-name').html(`<p>Welcome ${name} </p>`)
      
    }
  })
 
  // populate total candidates
  $.ajax({
    url:`http://localhost:3000/candidates/`,
    type:'GET',
    dataType:'json',
      success:function(data){
      var allCandidates = data.length
      $('#t-candidates').append(` ${allCandidates} Candidates`)
      
    }
  })

  // populate total voters
  $.ajax({
    url:`http://localhost:3000/voters/`,
    type:'GET',
    dataType:'json',
      success:function(data){
      var allVoters = data.length
      $('#t-voters').append(` ${allVoters} Voters`)
      
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
      <td><button class="btn btn-secondary mr-2" data-toggle="modal" data-target="#edit-modal" onclick=editCandidateButton(${person.id})>Edit</button><button class="btn btn-danger" onclick=deleteCandidateButton(${person.id})>Delete</button></td></tr>`
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
    <td><button class="btn btn-secondary mr-2" onclick=editVoterButton(${person.id})>Edit</button>
    <button class="btn btn-danger" onclick=deleteVoterButton(${person.id})>Delete</button></td></tr>`
  })

  $('#voter-table').append(voter)
  }})

  // search candidate table

  $('#search').keyup(function() {
    search_table($(this).val()); })
  
    function search_table(value){
    $("#candidate-search tr").each(function(){
      var found = 'false';
        $(this).each(function(){
          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){found = 'true'}});
          if(found == 'true') {$(this).show()} else {$(this).hide();}
      
      }
    )

}

})

// FUNCTIONS SECTION

// function to delete candidate

  function deleteCandidateButton(id) {
    const options = {
      url:`http://localhost:3000/candidates/${id}`,
      type:'DELETE',
      dataType:'json',
    };
    $.ajax(options).done(() => {
      alert('candidate deleted successfully')
    })  
  }

  //function to delete voter

  function deleteVoterButton(id) {
    const options = {
      url:`http://localhost:3000/voters/${id}`,
      type:'DELETE',
      dataType:'json',
    };
    $.ajax(options).done(() => {
      alert('candidate deleted successfully')
    })  
  }

  // function to edit candidate

  function editCandidateButton(id) {
    const options = {
      url:`http://localhost:3000/candidates/${id}`,
      type:'GET',
      dataType: 'json',
    };
    
    $.ajax(options).done((data) => {
      var name = data.name;
      var email = data.email;
      var password = data.password;
      var age = data.age;
      var sex = data.sex;
      var vote = data.votes;

      $('#edit-name').val(name)

      $('#edit-form').submit(function(e){
        e.preventDefault();
        var name = $('#edit-name').val();
        const updatedData = {"name": name,
        "email": email,
        "password": password,
        "age": age,
        "sex": sex,
        "votes": vote}

        const options = {
           url:`http://localhost:3000/candidates/${id}`,
            type:'PUT',
            dataType: 'json',
            data: updatedData
           };
         $.ajax(options).done(() => alert('candidate edited successfully') )
       })
      })}

      // function to edit voter

      function editVoterButton(id) {
        const options = {
          url:`http://localhost:3000/voters/${id}`,
          type:'GET',
          dataType: 'json',
        };
    
        $.ajax(options).done((data) => {
          var name = data.name;
          var email = data.email;
          var password = data.password;
          var age = data.age;
          var sex = data.sex;

          $('#edit-name').val(name)
    
          $('#edit-form').submit(function(e){
            e.preventDefault();
            var name = $('#edit-name').val();
            const updatedData = {"name": name,
            "email": email,
            "password": password,
            "age": age,
            "sex": sex}

            const options = {
               url:`http://localhost:3000/voters/${id}`,
                type:'PUT',
                dataType: 'json',
                data: updatedData
               };
             $.ajax(options).done(() => alert('candidate edited successfully') )
           })
          })}
       
 
  
  
  
