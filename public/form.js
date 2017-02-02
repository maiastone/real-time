const socket = io();
const connectionCount = $('#connection-count');
const statusMessage = $('#status-message');

socket.on('connect', function () {
  console.log('You have connected!');
  socket.send('message', {
    username: 'yournamehere',
    text: 'I did the thing.'
  });
});

socket.on('message', function (message) {
  console.log('Something came along on the "message" channel:', message);
});


socket.on('usersConnected', (count) => {
  connectionCount.text(`Connected Users: ` + count)
});


socket.on('statusMessage', (message) => {
  statusMessage.text(message);
});

const buttons = document.querySelectorAll('.radio buttons');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}
socket.on('voteCount', (votes) => {
  console.log(votes);
});

$(document).ready(function() {
  let surveyID = getParameterByName('surveyID');
  fetchRenderSurvey(surveyID);
});



  function fetchRenderSurvey(surveyID) {
    $.get(`/api/survey/${surveyID}`, function(data) {
        if (surveyID === null) {
          console.log('There is no survey')
        } else {
          console.log(data.formData.survey);
          let name = data.formData.survey.name;
          let selection1 = data.formData.survey.selections[0].text;
          let selection2 = data.formData.survey.selections[1].text;
          let selection3 = data.formData.survey.selections[2].text;
          let selection4 = data.formData.survey.selections[3].text;
          $('.question').append(`
            <h2 class="form-name">${name}</h2>`)
          $('.selection-1').append(`<div class='selection-container'>
            <button
              type='radio'
              name='answer'
              class='radio'
              value='selection1'>A
            </button>
            <h3 class='selection'>${selection1}</h3></div>`)
          $('.selection-2').append(`<div class='selection-container'>
            <button
              type='radio'
              name='answer'
              class='radio'
              value='selection2'>B
            </button>
            <h3 class='selection'>${selection2}</h3></div>`)
          $('.selection-3').append(`<div class='selection-container'>
            <button
              type='radio'
              name='answer'
              class='radio'
              value='selection3'>C
            </button>
            <h3 class='selection'>${selection3}</h3></div>`)
          $('.selection-4').append(`<div class='selection-container'>
            <button
              type='radio'
              name='answer'
              class='radio'
              value='selection4'>D
            </button>
            <h3 class='selection'>${selection4}</h3></div>`)
        }
      })
    }

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
