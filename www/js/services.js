angular.module('starter.services', [])

.factory('userEmailFactory', function() {

  var userEmail = "";

  return {
    setUserEmail: function(userEmail) {
      console.log('user', userEmail);
      return userEmail;
    },
    getUserId: function(userEmail) {
      userEmail = userEmail;
    }

  }

})

.factory('LoggedInFactory', function() {

  var loggedin = true;

  return {
    setLoggedIn: function(loggedin) {
      loggedin = loggedin;
    },
    getLoggedIn: function() {
      return loggedin;
    }

  }

});
