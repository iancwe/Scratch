jQuery(function ($) {
  $('#modalLog').on('submit', function (e) {
    console.log('hi!')
    e.preventDefault()
    $.ajax({
      dataType: 'json',
      url: '/login-ajax', // this is the submit URL
      type: 'POST', // or POST
      data: $('#modalLog').serialize(),
      success: function (data) {
        if(data.message = 'success') {
          // close the modal
          // change the location to profile page
        }
      }
    })
  })
})
