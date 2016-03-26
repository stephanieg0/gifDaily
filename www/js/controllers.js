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

    //call to my server
    $http({
      method: 'GET',
      url: 'https://gifdaily-server.herokuapp.com'
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

      $http.post('https://gifdaily-server.herokuapp.com', data)
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
    url: 'https://gifdaily-server.herokuapp.com/favorites'
  })
  .then(function successCallback(response){
    console.log('favorites', response.data);

    $scope.favorites = response.data;

  }, function errorCallback(error){
    return error;
  });

  $scope.deleteFavorite = function (gifId, gifUrl) {

    const deteleData = {gifId: gifId, gifUrl: gifUrl};

    $http.delete('https://gifdaily-server.herokuapp.com/favorites/' + gifId)
        .success(function (data, status, headers) {
        })
        .error(function (data, status, header) {
        });
  }
})//end of controller


.controller('LoginCtrl', function($scope, $http, $location) {

  $scope.SignUp = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }
    console.log(userData);

    $http.post('https://gifdaily-server.herokuapp.com/signUp', userData)
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

    $http.post('https://gifdaily-server.herokuapp.com/login', userData)
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

