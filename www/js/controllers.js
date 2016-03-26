angular.module('starter.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $http, $cordovaSocialSharing) {
    //setting local storage to find user
    $scope.user = JSON.parse(localStorage.getItem("user")) || {};
    //simple authentication after loggin in.
    if (!$scope.user.user) {
      $scope.loggedin = true;
    } else {
      $scope.loggedin = false;
    }

    console.log(!$scope.user.user);
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


.controller('LoginCtrl', function($scope, $http, $location, LoggedInFactory, userEmailFactory) {

  $scope.SignUp = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }
    console.log(userData);

    $http.post('http://localhost:3000/signUp', userData)
              .success(function (statusData, status, headers) {

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
                $scope.user = {user: userData.email};

                localStorage.setItem('user', JSON.stringify($scope.user));

                $location.url('/tab/main');

              })
              .error(function (statusData, status, header) {
                localStorage.setItem('user', JSON.stringify({}));
                console.log(status);
              });

  }

});

