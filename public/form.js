$(document).ready(function() {

  let surveyID = getParameterByName('surveyID');

  fetchSurvey(surveyID);
  renderSurvey(surveyID);

});

  function fetchSurvey(surveyID) {
    $.get(`/api/survey/${surveyID}`, function(data) {
      console.log(data.formData.survey.name);
      let name = data.formData.survey.name;
      $('.selection-1').append(`<h3>${name}</h3>`)
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

  function renderSurvey(surveyID) {
    if (surveyID === null) {
      console.log('There is no survey')
    } else {
    $('.question').append(`<h3>${surveyID}</h3>`)
    $('.selection-1').append(`<h3>${name}</h3>`)
    }
  }
