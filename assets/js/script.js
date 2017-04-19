// jQuery script to link log in modal with passport
jQuery(function ($) {
  $('#modalLog').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      dataType: 'json',
      url: '/login-ajax', // this is the submit URL
      type: 'POST', // or POST
      data: $('#modalLog').serialize(),
      success: function (data) {
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

// jQuery script to link sign up modal with passport
jQuery(function ($) {
  $('#modalSign').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      dataType: 'json',
      url: '/sign-ajax', // this is the submit URL
      type: 'POST', // or POST
      data: $('#modalSign').serialize(),
      success: function (data) {
        if (data.message === 'success') {
          $('#modalSign').hide()
          window.location.replace('/home')
        } else if (data.message === 'error') {
          $('#modalErrorSignAlert').show()
        }
      }
    })
  })
})
