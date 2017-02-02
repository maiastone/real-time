
$(document).ready(function() {

  $('.submit').click((e) => {
    e.preventDefault();

    const formData = {
      name: $('#name').val(),
      selections: [
        {
          id: 1,
          text: $('#A').val()
        },
        {
          id: 2,
          text: $('#B').val()
        },
        {
          id: 3,
          text: $('#C').val()
        },
        {
          id: 4,
          text: $('#D').val()
        }
      ]
    };

    fetch('/api/survey', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        survey: formData
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      window.location = `/?surveyID=${json.id}`
    })
    .catch((err) => {
      console.error(err)
    })
  });


});
