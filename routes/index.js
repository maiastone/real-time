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

app.get('/login',
  function(req, res){
    res.render('login', { env: env });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});


app.use(passport.initialize());
app.use(passport.session());
