angular.module('starter.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $http, $cordovaSocialSharing, $rootScope, LoggedInFactory, AuthFactory) {
    //setting local storage to find user
    $scope.user = JSON.parse(localStorage.getItem("user")) || {};
    //simple authentication after loggin in.
    if (!$scope.user.UserId) {
      $rootScope.loggedin = true;

    } else {
      $rootScope.loggedin = false;

    }
    console.log('mainCtrl user', !$scope.user.UserId);
    console.log('mainCtrl loggedin', $rootScope.loggedin);
    console.log('mainCtrl userdata', $scope.user);
    //call to my server
    $http({
      method: 'GET',
      url: 'http://localhost:3000'
      //https://gifdaily-server.herokuapp.com
      //dev> http://localhost:3000
    })
    .then(function successCallback(response){

      $scope.giphys = response.data.data;

    }, function errorCallback(error){
      return error;
    });


    //save to favorites
    $scope.saveFavorite = function (gifUrl) {
      var currentUser = AuthFactory.getUser();
      //console.log(currentUser);
      const data = {gifUrl: gifUrl, UserId: currentUser.UserId};

      $http.post('http://localhost:3000', data)
              .success(function (data, status, headers) {
                console.log(status);
              })
              .error(function (data, status, header) {
                console.log(status);
              });
    }//end of fn

    $scope.Share = function (gifUrl) {

      $cordovaSocialSharing
      .shareViaFacebook(null, null, gifUrl)
      .then(function(result) {
        console.log('success');
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }

    $rootScope.logout = function () {
      localStorage.setItem('user', JSON.stringify({}));
      $rootScope.loggedin = true;

    }

})//end of controller

.controller('favoritesCtrl', function($scope, $http, $rootScope, LoggedInFactory) {

  //call to my server
  $http({
    method: 'GET',
    url: 'http://localhost:3000/favorites'
  })
  .then(function successCallback(response){
    //console.log('favorites', response.data);

    $scope.favorites = response.data;

  }, function errorCallback(error){
    return error;
  });

  $scope.deleteFavorite = function (gifId, gifUrl) {

    const deteleData = {gifId: gifId, gifUrl: gifUrl};

    $http.delete('http://localhost:3000/favorites/' + gifId)
        .success(function (data, status, headers) {
        })
        .error(function (data, status, header) {
        });
  }
})//end of controller


.controller('LoginCtrl', function($scope, $http, $location, AuthFactory, $rootScope) {

  $scope.SignUp = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }

    $http.post('http://localhost:3000/signUp', userData)
              .success(function (statusData, status, headers) {
                console.log('success');
                $scope.user = {user: userData.email};

                localStorage.setItem('user', JSON.stringify($scope.user));

                $location.url('/tab/main');
              })
              .error(function (statusData, status, header) {
                localStorage.setItem('user', JSON.stringify({}));
                console.log(status);
              });

  }

  $scope.Login = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }

    $http.post('http://localhost:3000/login', userData)
              .success(function (statusData, status, headers) {
                console.log('success');


                AuthFactory.setUser(userData.email);

                $location.url('/tab/main');

                //$rootScope.loggedin = false;
              })
              .error(function (statusData, status, header) {
                localStorage.setItem('user', JSON.stringify({}));
                console.log(status);
              });

  }

});

