//jslint esnext: true
//jshint esnext: true

let mainApp = angular.module('HeroSearchApp', ['ngRoute']);
let mainRequestUrl = 'http://gateway.marvel.com:80/v1/public/characters?events=29&apikey=7ac2434b13b9586847ea8973d001c6a6&limit=10';

mainApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/herolist', {
      controller: 'HeroListController',
      templateUrl: 'optionviews/herolist.html',
    })
    .when('/details', {
      controller: 'DetailsController',
      templateUrl: 'optionviews/extradetailed.html',
    })/*.otherwise({
      controller: 'HeroListController',
      templateUrl: 'optionviews/herolist.html',
    })*/;
}]);

//Mock controller
// mainApp.controller('HeroListController', function($scope){
//   console.log('The List of Heroes');
// });
//mainApp.controller('DetailsController', function($scope){
//   console.log('The Extra Details of Clicked Hero');
// });

mainApp.controller('HeroListController', ['$scope', '$http', 'HeroDetails', function($scope, $http, HeroDetails){

  $http({
    method: 'GET',
    url: mainRequestUrl,
  }).then(function (response){
    console.log('first response', response.data.data.results);
    $scope.heroes = response.data.data.results;
  });
    $scope.extradetails = function(hero){
      HeroDetails.extradetails(hero);
    };

}]);

mainApp.controller('DetailsController', ['$scope', '$http', 'HeroDetails', function($scope, $http, HeroDetails){
    // let chardets = HeroDetails.extradetails(hero);
    $scope.name = hero.name;
    $scope.description = hero.description;
    $scope.clickedHeroPic = hero.thumbnail.path+'.'+hero.thumbnail.extension;
  }]);

mainApp.factory('HeroDetails', ['$http', function ($http) {
  return{
  extradetails: function(hero){
    var secondRequestUrl = 'https://gateway.marvel.com:443/v1/public/characters/'+hero.id+'/events?apikey=7ac2434b13b9586847ea8973d001c6a6';
    $http({
      method: 'GET',
      url: secondRequestUrl,
    }).then(function (response){
      $scope.events = response.data.data.results;
      console.log(response.data.data.results);

    });
  },
};
}]);


//
//     $scope.events=[];
//
//     $scope.clickedHeroPic = hero.thumbnail.path+'.'+hero.thumbnail.extension;
//     console.log($scope.clickedHeroPic);
//     $scope.currentchoice.name = hero.name;
//
// }]);
//
// $scope.heroes = [];
// $scope.herosearch = '';
// $scope.currentchoice = {
//   name: '',
//   id: '',
// };
