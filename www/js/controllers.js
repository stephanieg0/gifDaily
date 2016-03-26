angular.module('starter.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $http, $cordovaSocialSharing) {

    //call to my server
    $http({
      method: 'GET',
      url: 'http://localhost:3000'
      //https://gifdaily-server.herokuapp.com
      //dev> http://localhost:3000
    })
    .then(function successCallback(response){
      console.log(response.data.data);
      $scope.giphys = response.data.data;

    }, function errorCallback(error){
      return error;
    });


    //save to favorites
    $scope.saveFavorite = function (gifId, gifUrl) {

      const data = {gifId: gifId, gifUrl: gifUrl};

      console.log(data);

      $http.post('http://localhost:3000', data)
              .success(function (data, status, headers) {
              })
              .error(function (data, status, header) {
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


})//end of controller

.controller('favoritesCtrl', function($scope, $http) {

  console.log('favorites controller is working');
  //call to my server
  $http({
    method: 'GET',
    url: 'http://localhost:3000/favorites'
  })
  .then(function successCallback(response){
    console.log('favorites', response.data);

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


.controller('LoginCtrl', function($scope, $http) {

  $scope.SignUp = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }
    console.log(userData);

    $http.post('http://localhost:3000/signUp', userData)
              .success(function (userData, status, headers) {
                console.log('success');
              })
              .error(function (userData, status, header) {
                console.log('failed');
              });

  }

    $scope.Login = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }
    console.log(userData);

    $http.post('http://localhost:3000/login', userData)
              .success(function (userData, status, headers) {
              })
              .error(function (userData, status, header) {
              });

  }

});

