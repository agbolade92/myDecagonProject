
$(document).ready(function(){

  // get username
  if (localStorage.getItem('userID') === ''){ window.location = 'voter-login.html'} else{
  var id =localStorage.getItem('userID')
  $.ajax({
    url:`http://localhost:3000/voters/${id}`,
    type:'GET',
    dataType:'json',
      success:function(data){
      var name = data.name;
      $('#p-name').html(`<p>Welcome ${name} </p>`)
      
    }
  })}

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
      <td><button id="vote-button" class="btn btn-success mr-2" onclick=voteButton(${person.id})>Vote</button><button id="unvote-button" class="btn btn-danger" onclick=unVoteButton(${person.id})>UnVote</button></td></tr>`
    })

    $('#candidate-tbody').append(candidate)
 }})


})

// SEARCH FUNCTION

$('#candidate-search-input').keyup(function() {
  search_table($(this).val()); })

  function search_table(value){
  $("#candidate-tbody tr").each(function(){
    var found = 'false';
      $(this).each(function(){
        if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){found = 'true'}});
        if(found == 'true') {$(this).show()} else {$(this).hide();}
      }
    )
  }



// VOTE FUNCTION
  function voteButton(id) {
    if(localStorage.getItem('votedCandidate') == ''){
        toVote(id)
     return localStorage.setItem('votedCandidate',id)}
     else if (localStorage.getItem('votedCandidate') == id ){
      return alert('you have voted for this candidate already')}
      else if (localStorage.getItem('votedCandidate') != id){
        return alert('you have voted for another candidate before')}     
}

// UNVOTE FUNCTION

function unVoteButton(id) {
  if(localStorage.getItem('votedCandidate') == ''){
    return alert('you have not voted at all')}
   else if (localStorage.getItem('votedCandidate') == id ){
    toUnVote(id)
    return localStorage.setItem('votedCandidate','')}
    else if (localStorage.getItem('votedCandidate') != id){
      return alert('you cannot unvote another candidate')}     
}

// TO VOTE FUNCTION

  function toVote(id){
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


  // TO UNVOTE FUNCTION

  function toUnVote(id){
    const options = {
      url:`http://localhost:3000/candidates/${id}`,
      type:'GET',
      dataType: 'json',
    };

    $.ajax(options).done((data) => {
      var votes = JSON.parse(data.votes)
      var votes1 = Number(votes)
    console.log(votes);
      votes1 = votes1 - 1
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
      $.ajax(options).done(() => alert('candidate unvoted successfully') )
})}