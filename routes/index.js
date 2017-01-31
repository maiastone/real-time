const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.render('login', { env: env });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/user');
});

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If our applicatione encounters an error, we'll display the error and stacktrace accordingly.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});


app.use(passport.initialize());
app.use(passport.session());
