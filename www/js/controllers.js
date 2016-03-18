angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $http) {
  const today = new Date();
  console.log(today);

  //call to my server
  $http({
    method: 'GET',
    url: 'http://localhost:3000'
    //https://gifdaily-server.herokuapp.com
  })
  .then(function successCallback(response){
    console.log('response', response.data.data);

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

})

.controller('favoritesCtrl', function($scope, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log('favorites controller is working');
  //call to my server
  $http({
    method: 'GET',
    url: 'http://localhost:3000/favorites'
    //https://gifdaily-server.herokuapp.com
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

    $http.delete('http://localhost:3000/favorites/' + gifId)
        .success(function (data, status, headers) {
        })
        .error(function (data, status, header) {
        });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
