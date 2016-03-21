angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $http, $cordovaSocialSharing) {
  const today = new Date();
  console.log(today);

  //call to my server
  $http({
    method: 'GET',
    url: 'https://gifdaily-server.herokuapp.com'
    //https://gifdaily-server.herokuapp.com
    //dev> http://localhost:3000
  })
  .then(function successCallback(response){

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
            })
            .error(function (data, status, header) {
            });
  }//end of fn

  $scope.Share = function (gifUrl) {

    $cordovaSocialSharing
    .shareViaFacebook(gifUrl)
    .then(function(result) {
      console.log('success');
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

})

.controller('favoritesCtrl', function($scope, $http) {

  console.log('favorites controller is working');
  //call to my server
  $http({
    method: 'GET',
    url: 'https://gifdaily-server.herokuapp.com/favorites'
    //https://gifdaily-server.herokuapp.com
    //dev> http://localhost:3000/favorites
  })
  .then(function successCallback(response){
    console.log('favorites', response.data);

    $scope.favorites = response.data;

  }, function errorCallback(error){
    return error;
  });

  $scope.deleteFavorite = function (gifId, gifUrl) {

    const deteleData = {gifId: gifId, gifUrl: gifUrl};
    console.log(deteleData);

    $http.delete('https://gifdaily-server.herokuapp.com/favorites/' + gifId)
        .success(function (data, status, headers) {
        })
        .error(function (data, status, header) {
        });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope) {

});

