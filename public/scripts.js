$(document).ready(function() {

  var AUTH0_CLIENT_ID = '7EfFcVXZ0NycSabHVlBnr43zfs4cSmnh';
  var AUTH0_DOMAIN = 'maiastone.auth0.com';
  var AUTH0_CALLBACK_URL = location.href;


  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' }
    }
  });

  $('#btn-login').click((e) => {
    e.preventDefault();
    lock.show();
  });

  $('#btn-logout').click((e) => {
    e.preventDefault();
    logout();
  });

  lock.on('authenticated', (authResult) => {
    lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      showProfile(profile);
    });
  });

  var retrieveUser = function() {
    let id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile (id_token, (error, profile) => {
        if (error) {
          return alert ('error getting profile')
        }
        showProfile(profile);
        profileData = profile;
      });
    }
  };

  var showProfile = function(profile) {
    $('#btn-login').hide();
    $('.avatar').attr('src', profile.picture).show();
    $('.name').text(`Hi, ${profile.name}.`);
    $('#btn-logout').show();
  };

  retrieveUser();

  var logout = function() {
    localStorage.removeItem('id_token');
    $('.survey-page').hide();
    socket.emit('logout', profileData)
    window.location.href = '/';
  }

});
