const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const md5 = require('md5');
const path = require('path');
const passport = require('passport');
const environment = process.env.NODE_ENV || 'development';

const socketIo = require('socket.io');
const port =  process.env.PORT || 3000;

const server = http.createServer(app)
   .listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });

const io = socketIo(server);
app.locals.votes = [
    [],
    [],
    [],
    [],
];

io.on('connection', function (socket) {

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', (channel, index, user) => {
    if (channel === 'voteCast') {
      assignUser(user, index-1)
      socket.emit('voteCount', app.locals.votes);
    }
  });

  function assignUser(newUser, index) {
    let votes = app.locals.votes;
    votes = votes.map(function(selection) {
      return selection.filter(function(user) {
        return newUser.user_id != user.user_id
      })
    })
    votes[index].push(newUser)
    app.locals.votes = votes;
  }

  socket.emit('voteCount', app.locals.votes);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', () => {
  console.log('A user has disconnected.', io.engine.clientsCount);

  });
});

const countVotes = (votes) => {
  const voteCount = [
      [],
      [],
      [],
      [],
  ];

  for (let vote in votes) {
    voteCount[votes[vote]]++
  }

  return voteCount;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

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


app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
