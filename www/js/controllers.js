angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: 'https://gifdaily-server.herokuapp.com'
  }).then(function successCallback(response){
    console.log('response', response.data);
    $scope.Data = response.data;
  }, function errorCallback(error){
    return error;
  });

})

.controller('favoritesCtrl', function($scope, favorites) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.favorites = favorites.all();
  $scope.remove = function(chat) {
    favorites.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
