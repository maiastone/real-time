$(document).ready(function() {

  $('.submit').click((e) => {
    e.preventDefault();
    console.log('form submitted!');
    const formData = {
      name: $('#name').val()
    }
    console.log(formData);
  })

})
