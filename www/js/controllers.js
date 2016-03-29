angular.module('starter.controllers', ['ionic'])

.controller('mainCtrl', function($scope, $http, $cordovaSocialSharing, $rootScope, AuthFactory, $location) {
    //setting local storage to find user
    $scope.user = JSON.parse(localStorage.getItem("user")) || {};
    //simple authentication after loggin in.
    if (!$scope.user.UserId) {
      $rootScope.loggedin = true;
      $rootScope.loggedout = false;
      $rootScope.YouAreLoggedIn = "";
    } else {
      $rootScope.loggedin = false;
      $rootScope.loggedout = true;
      $rootScope.YouAreLoggedIn = "You are looged in";
    }

    //call to my server
    //load scroll
    $scope.loadMore = function () {
      $scope.giphys = [];

      console.log('loadMore is working');

      $http({
        method: 'GET',
        url: 'https://gifdaily-server.herokuapp.com'
        //https://gifdaily-server.herokuapp.com
        //dev> https://localhost:3000
      })
      .then(function successCallback(response){

        $scope.giphys = response.data.data;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function errorCallback(error){
        return error;
      });
    }

    $scope.$on('$stateChangeSuccess', function() {
      $scope.loadMore();
    });


    //save to favorites
    $scope.saveFavorite = function (gifUrl) {
      console.log('fav works');
      var currentUser = AuthFactory.getUser();

      const data = {gifUrl: gifUrl, UserId: currentUser.UserId};

      $http.post('https://gifdaily-server.herokuapp.com', data)
              .success(function (data, status, headers) {

              })
              .error(function (data, status, header) {

              });
    }//end of fn

    $scope.ShareFacebook = function (gifUrl) {

      $cordovaSocialSharing
      .shareViaFacebook(null, null, gifUrl)
      .then(function(result) {

      }, function(err) {
          alert(err);
        // An error occurred. Show a message to the user
      });
    }

    $scope.ShareSMS = function (gifUrl, number) {

      $cordovaSocialSharing
      .shareViaSMS(gifUrl, number)
      .then(function(result) {
        // Success!
      }, function(err) {
          alert(err);
        // An error occurred. Show a message to the user
      });

    }

    $scope.ShareEmail = function (gifUrl) {
      $cordovaSocialSharing
      .shareViaEmail(null, null, [], [], [], gifUrl)
      .then(function(result) {
        // Success!
      }, function(err) {
          alert(err);
        // An error occurred. Show a message to the user
      });

    }

    $scope.ShareTwitter = function (gifUrl) {
      $cordovaSocialSharing
      .shareViaTwitter(null, null, link)
      .then(function(result) {
        // Success!
      }, function(err) {
          alert(err);
        // An error occurred. Show a message to the user
      });
    }

    $rootScope.logout = function () {
      localStorage.setItem('user', JSON.stringify({}));
      $rootScope.loggedin = true;
      $location.url('/tab/main');

    }

})//end of controller

.controller('favoritesCtrl', function($scope, $http, $rootScope) {

  $scope.user = JSON.parse(localStorage.getItem("user")) || {};

  if (!$scope.user.UserId) {

    $scope.favorites = [];
    $scope.message = "Log in to add favorites";
  } else {

      //call to my server
      $http({
        method: 'GET',
        url: 'https://gifdaily-server.herokuapp.com/favorites'
      })
      .then(function successCallback(response){
        //console.log('favorites', response.data);

        $scope.favorites = response.data;

        for (var i= 0; i < $scope.favorites.length; i++) {

          console.log('favorite data', $scope.favorites[i]);
          console.log('userData', $scope.user.UserId);

          if ($scope.favorites[i].UserId === $scope.user.UserId) {
            console.log('true');
            $scope.message = "";

          } else {

            $scope.message = "No favorites added";
          }

        }
      }, function errorCallback(error){
        return error;
      });



  }


  $scope.deleteFavorite = function (gifId, gifUrl) {

    const deteleData = {gifId: gifId, gifUrl: gifUrl};

    $http.delete('https://gifdaily-server.herokuapp.com/favorites/' + gifId)
        .success(function (data, status, headers) {
          console.log(status);
          //take out the the gif of the scope favorites
          console.log('$scope.favorites in delete fn', $scope.favorites);
        })
        .error(function (data, status, header) {
          console.log(status);
        });
  }
})//end of controller


.controller('LoginCtrl', function($scope, $http, $location, AuthFactory, $rootScope) {

  $scope.UserError = "";

  $scope.SignUp = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
      email: email,
      password: password
    }

    $http.post('https://gifdaily-server.herokuapp.com/signUp', userData)
              .success(function (statusData, status, headers) {
                console.log('success');
                $scope.UserError = "";

                AuthFactory.setUser(userData).then(function () {

                  document.getElementById("email").value = "";
                  document.getElementById("password").value = "";

                  $location.url('/tab/main');

                });

              })
              .error(function (statusData, status, header) {
                console.log(status);
                localStorage.setItem('user', JSON.stringify({}));
                $scope.UserError = statusData;
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
                console.log('success');
                $scope.UserError = "";

                AuthFactory.setUser(userData).then(function () {

                  document.getElementById("email").value = "";
                  document.getElementById("password").value = "";

                  $location.url('/tab/main');

                });


                //$rootScope.loggedin = false;
              })
              .error(function (statusData, status, header) {
                console.log(status);
                localStorage.setItem('user', JSON.stringify({}));
                $scope.UserError = statusData;
              });

  }

})
.controller('tabsCtrl', function($scope, $rootScope) {

      //setting local storage to find user
    $scope.user = JSON.parse(localStorage.getItem("user")) || {};
    //simple authentication after loggin in.
    if (!$scope.user.UserId) {
      $rootScope.loggedin = true;

    } else {
      $rootScope.loggedin = false;

    }

});

