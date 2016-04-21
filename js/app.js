//jslint esnext: true
//jshint esnext: true

var mainApp = angular.module('HeroSearchApp', [ngRoute]);
var mainRequestUrl = 'http://gateway.marvel.com:80/v1/public/characters?events=29&orderBy=name&apikey=7ac2434b13b9586847ea8973d001c6a6&limit=10';
//var mainRequestUrl = 'http://gateway.marvel.com:80/v1/public/characters?orderBy=name&apikey=7ac2434b13b9586847ea8973d001c6a6&limit=50';
var secondRequestUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+hero.id+'/events?apikey=7ac2434b13b9586847ea8973d001c6a6';


mainApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/herolist', {
      controller: 'HeroListController',
      templateUrl: 'optionviews/herolist.html',
    })
    .when('/details', {
      controller: 'DetailsController',
      templateUrl: 'optionviews/extradetailed.html',
    });
}]);

mainApp.controller('HeroListController', ['$scope', '$http', '$route', 'HeroList', function($scope, $http, $route, HeroList){
  $scope.heroes = [];
  $scope.events=[];
  $scope.herosearch = '';
  $scope.currentchoice = {
    name: '',
    id: '',
  };

  $http({
    method: 'get',
    url: mainRequestUrl,
  }).then(function (response){
    console.log(response.data.data.results);
    heroes = response.data.data.results;
  });
  
}]);

mainApp.controller('DetailsController', ['$scope', '$http', 'extradetails', function($scope, $http, extradetails){

    $scope.clickedHeroPic = hero.thumbnail.path+'.'+hero.thumbnail.extension;
    console.log($scope.clickedHeroPic);
    $scope.currentchoice.name = hero.name;
    $http({
      method: 'get',
      url: secondRequestUrl,
    }).then(function (response){
      $scope.events = response.data.data.results;
      console.log(response.data.data.results);

    });
}]);
