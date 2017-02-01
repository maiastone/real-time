$(document).ready(function() {

  $('.submit').click((e) => {
    e.preventDefault();
    console.log('form submitted!');
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
    }
      console.log(formData);
    })
})
