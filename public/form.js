$(document).ready(function() {

  let surveyID = getParameterByName('surveyID');
  console.log(surveyID);
  getSurvey(surveyID);
  renderSurvey(surveyID)

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

    function getSurvey(surveyID) {
    $.get(`/api/survey/${surveyID}`, function(data) {
      console.log(data);
    });
  }

    function renderSurvey(surveyID) {
      if (surveyID === null) {
        console.log('There is no survey')
      } else {
      $('.question').append(`<h3>${surveyID}</h3>`)
      }
    }
