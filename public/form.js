const socket = io();
const connectionCount = $('#connection-count');
const statusMessage = $('#status-message');
const buttons = document.querySelectorAll('.select buttons');

$(document).ready(function() {
  let surveyID = getParameterByName('surveyID');
  fetchSurvey(surveyID);
  $('.complete-survey').on('click', 'button', function(e) {
    e.preventDefault();
    socket.send('voteCast', this.innerText);
  })
});

// send profile with vote submit over the wire
// array of arrays for each quesitons

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

socket.on('voteCount', (votes) => {
  console.log(votes);
});

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

function fetchSurvey(surveyID) {
  $.get(`/api/survey/${surveyID}`, function(data) {
      if (surveyID === null) {
        console.log('There is no survey')
      } else {
        $('.form').hide();
        renderSurvey(data);
        if (!localStorage.getItem('id_token')) {
          $('.complete-survey').hide();
          $('#btn-login').show();
        }
      }
  })
}

function appendSelection(className, value, buttonText, selectionText) {
  $(className).append(`<div class='selection-container'>
    <button
      name='answer'
      class='select'
      value=${value}>${buttonText}
    </button>
    <h3 class='selection'>${selectionText}</h3></div>`)
};

function renderSurvey(data) {
  let name = data.formData.survey.name;
  let selection1 = data.formData.survey.selections[0].text;
  let selection2 = data.formData.survey.selections[1].text;
  let selection3 = data.formData.survey.selections[2].text;
  let selection4 = data.formData.survey.selections[3].text;
  $('.question').append(`<h2 class='form-name'>${name}</h2>`)
  appendSelection('.selection-1', 'selection1', 'A', selection1)
  appendSelection('.selection-2', 'selection2', 'B', selection2)
  appendSelection('.selection-3', 'selection3', 'C', selection3)
  appendSelection('.selection-4', 'selection4', 'D', selection4)
};
