angular.module('starter.services', [])

.factory('AuthFactory', function($http, $q) {

  var currentUser = "";

  return {

    setUser: function (userData) {
      var currentEmail = userData.email;

      return $q(function (resolve, reject) {
        //call to my server
        $http({
          method: 'GET',
          url: 'https://gifdaily-server.herokuapp.com/users'
        })
        .then(function successCallback(response){
          console.log('users', response);
          for (var i = 0; i < response.data.length; i++) {

            if (currentEmail === response.data[i].email) {

              currentUser = response.data[i];

              localStorage.setItem('user', JSON.stringify(currentUser));

              resolve(currentUser);
            }

          }

        }, function errorCallback(error){
          reject(error);
        });

      })//end of promise fn
    },

    getUser: function () {

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

    },
    getLoggedIn: function() {

      return loggedin;
    }

  }

});
