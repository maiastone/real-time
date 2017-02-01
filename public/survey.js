
$(document).ready(function() {

  const surveyID = getParameterByName('surveyID');
  console.log(surveyID);
  const getSurvey = (surveyID) => {
    fetch(`/api/survey/${surveyID}`)
    .then ((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  getSurvey(surveyID);

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



})
