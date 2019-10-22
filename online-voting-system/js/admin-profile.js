
 $(document).ready(function(){

  // get username
  if (localStorage.getItem('adminID') === ''){ window.location = 'admin-login.html'} else{
  var id =localStorage.getItem('adminID')
  $.ajax({
    url:`http://localhost:3000/admin/${id}`,
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
      <td><button class="btn btn-secondary mr-2" data-toggle="modal" data-target="#candidate-edit-modal" onclick=editCandidateButton(${person.id})>Edit</button><button class="btn btn-danger" onclick=deleteCandidateButton(${person.id})>Delete</button></td></tr>`
    })

    $('#candidate-tbody').append(candidate)
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
    <td><button class="btn btn-secondary mr-2" data-toggle="modal" data-target="#voter-edit-modal" onclick=editVoterButton(${person.id})>Edit</button>
    <button class="btn btn-danger" onclick=deleteVoterButton(${person.id})>Delete</button></td></tr>`
  })

  $('#voter-tbody').append(voter)
  }})

  // search candidate table

  $('#candidate-search').keyup(function() {
    search_table1($(this).val());})
  
    function search_table1(value){
    $("#candidate-tbody tr").each(function(){
      var found = 'false';
        $(this).each(function(){
          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){found = 'true'}});
          if(found == 'true') {$(this).show()} else {$(this).hide();}
        }
      )
    }

    // search voter table

  $('#voter-search').keyup(function() {
    search_table($(this).val()); })
  
    function search_table(value){
    $("#voter-tbody tr").each(function(){
      var found = 'false';
        $(this).each(function(){
          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){found = 'true'}});
          if(found == 'true') {$(this).show()} else {$(this).hide();}
        }
      )
    }


    // smooth scrolling
    $('#main-nav a').click(function(e)
    {
      if(this.hash !== '')
      {
        e.preventDefault();
        var hash = this.hash;
        $('html,body').animate
        ({
          scrollTop: $(hash).offset().top
        }, 900, function(){window.location.hash = hash;})
      }
    })


    // scroll top
      $(window).scroll(function (){
        if($(this).scrollTop() > 50 )
        {
          $('#back-to-top').fadeIn()
        } else 
        {
          $('#back-to-top').fadeOut()
        } 
      });
      // scroll body to 0px on click
      $('#back-to-top').click(function ()
    {
      $('body,html').animate(
        {
          scrollTop:0
        }, 400)
        return false;
    })
    
    

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

      $('#candidate-edit-submit').click(function(e){
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

          $('#edit-name1').val(name)
    
          $('#voter-edit-submit').click(function(e){
            e.preventDefault();
            var name = $('#edit-name1').val();
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
             $.ajax(options).done(() => alert('voter edited successfully') )
           })
          })}
       
 
  
  
  
