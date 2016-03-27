angular.module('starter.services', [])

.factory('AuthFactory', function($http) {

  var currentUser = "";

  return {

    setUser: function (email) {
      //call to my server
      $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
      })
      .then(function successCallback(response){

        for (var i = 0; i <= response.data.length; i++) {

          if (email === response.data[i].email) {

            currentUser = response.data[i];
            localStorage.setItem('user', JSON.stringify(currentUser));
            return currentUser;
          }

        }

      }, function errorCallback(error){
        return error;
      });

    },

    getUser: function () {
      console.log('getUser', currentUser);
      return currentUser;
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
