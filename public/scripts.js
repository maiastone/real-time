$(document).ready(function() {


  const lock = new Auth0Lock('qHCAwXwsNocsS60Lq96fs7H6qTs3osQD', 'maiastone.auth0.com',
      { auth:
          {
          redirectUrl: 'http://localhost:3000/',
            params: {
              scope: 'openid name picture'
            }
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
      debugger;
    });
  });

  function retrieveUser() {
    let id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile (authResult.idToken, (error, profile) => {
        if (error) {
          return alert ('error getting profile')
        }
        showProfile(profile);
      });
    }
  };

  function showProfile (profile) {
    console.log(profile);
    $('.btn-login').hide();
    $('.name').text(profile.nickname);
    $('.gravatar').attr('src', profile.picture).show();
  };

  retrieveUser();

});
