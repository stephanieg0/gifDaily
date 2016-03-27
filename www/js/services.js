angular.module('starter.services', [])

.factory('AuthFactory', function($http, $q) {

  var currentUser = "";

  return {

    setUser: function (userData) {
      var currentEmail = JSON.stringify(userData.email);
      return $q(function (resolve, reject) {
        //call to my server
        $http({
          method: 'GET',
          url: 'http://localhost:3000/users'
        })
        .then(function successCallback(response){
          console.log('http success');
          console.log(response.data);
          console.log('currentEmail', currentEmail);

          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].email);

            if (currentEmail = response.data[i].email) {

              currentUser = response.data[i];

              console.log('currentUser', currentUser);
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
