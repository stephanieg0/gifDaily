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

.factory('LoggedInFactory', function($rootScope) {

  var loggedin = "";

  return {
    setLoggedIn: function(value) {
      loggedin = value;
      return loggedin;
      console.log('factory', loggedin);
    },
    getLoggedIn: function() {
      console.log('factory get', loggedin);
      return loggedin;
    }

  }

});
