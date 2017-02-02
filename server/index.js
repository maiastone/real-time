const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const md5 = require('md5');
const path = require('path');
const passport = require('passport');
const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.set('port', process.env.PORT || 3000);

app.locals.surveys = [];

app.post('/api/survey', function (req, res) {
  const formData = req.body;
  const id = md5(formData);
  const currentSurvey = { id, formData }
  app.locals.surveys.push(currentSurvey)
  res.status(200).json(currentSurvey)
});

app.get('/api/survey/:surveyID', function (req, res) {
  const id = req.params.surveyID;
  let currentSurvey = app.locals.surveys[0]
  res.status(200).json(currentSurvey)
});

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
