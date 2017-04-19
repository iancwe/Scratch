jQuery(function ($) {
  $('#modalLog').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      dataType: 'json',
      url: '/login-ajax', // this is the submit URL
      type: 'POST', // or POST
      data: $('#modalLog').serialize(),
      success: function (data) {
        console.log(data)
        if (data.message === 'success') {
          $('#logmodal').hide()
          window.location.replace('/home')
        } else if (data.message === 'error') {
          $('#modalErrorAlert').show()
        }
      }
    })
  })
})
