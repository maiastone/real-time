var lock = new Auth0Lock('qHCAwXwsNocsS60Lq96fs7H6qTs3osQD', 'maiastone.auth0.com',
    { auth:
        {
        redirectUrl: 'http://localhost:3000/callback',
        responseType: 'code',
          params: {
            scope: 'openid name email picture'
          }
        }
});

$('#btn-login').click(function(e) {
  e.preventDefault();
  console.log('clicked!');
  lock.show();
});


lock.on('authenticated', function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('id_token', authResult.idToken);
    // Display user information
    show_profile_info(profile);
  });
});
