window.addEventListener('load', function() {

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
      });
    }
  };

  var showProfile = function(profile) {
    console.log(profile);
    $('.btn-login').hide();
    $('.name').text(profile.name);
    $('.avatar').attr('src', profile.picture).show();
  };

  retrieveUser();

});
