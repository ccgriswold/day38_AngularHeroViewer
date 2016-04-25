//jslint esnext: true
//jshint esnext: true

let mainApp = angular.module('HeroSearchApp', ['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/herolist', {
      controller: 'HeroListController',
      templateUrl: 'optionviews/herolist.html',
    })
    .when('/details', {
      controller: 'DetailsController',
      templateUrl: 'optionviews/extradetailed.html',
    })
    .when('/event', {
      controller: 'EventViewController',
      templateUrl: 'sections/event-view.html',
    })
    .otherwise({
      controller: 'ListViewController',
      templateUrl: 'sections/list-view.html',
        });
}]);

//Mock controller
// mainApp.controller('HeroListController', function($scope){
//   console.log('The List of Heroes');
// });
//mainApp.controller('DetailsController', function($scope){
//   console.log('The Extra Details of Clicked Hero');
// });

mainApp.controller('HeroListController', ['$scope', '$http', 'HeroSelected', function($scope, $http, HeroSelected){
    $scope.heroes = HeroSelected.grabHeroes();

    $scope.extradetails = function(hero){
      HeroSelected.extradetails(hero);
    };
    $scope.heroSearch = hero.name;
}]);

mainApp.controller('DetailsController', ['$scope', '$http', 'HeroSelected','$routeParams', function($scope, $http, $routeParams, HeroSelected){
    $scope.events = HeroSelected.heroEvent();
    $scope.currentChoice = HeroSelected.getSelected();
}]);

mainApp.controller('EventsController', ['$scope', '$http', '$routeParams', 'HeroSelected', function($scope, $http, $routeParams, HeroSelected){
  $scope.eventID = $routeParams.heroEvents;
  HeroSelected.setEventId($routeParams.heroEvents);
  HeroSelected.grabEventName($http);
  HeroSelected.grabEventDetails($http);
  $scope.heroPerson = HeroSelected.heroEvent();
  $scope.eventName = HeroSelected.setEventName();

  $scope.nextHero = function(heroPerson){
    HeroSelected.currentHero(heroPerson);
  };
}]);

mainApp.factory('HeroSelected', function ($http) {
  let name = '';
  var heroes = [];
  let events = [];
  let currentChoice = {
    name: '',
    pic: '',
    id: '',
  };

  $http({
    method: 'GET',
    url: 'http://gateway.marvel.com:80/v1/public/characters?events=29&apikey=7ac2434b13b9586847ea8973d001c6a6&limit=100',
  }).then(function (response){
    console.log('first response', response.data.data.results);
    return response.data.data.results;
  });

  return{
    grabHeroes: function(){
      return heroes;
    },
    getSelected: function(){
      return currentChoice;
    },
    heroEvent: function(){
      return events;
    },

    currentHero: function(hero){
      // console.log('currentHero is selected');
      currentChoice.name = hero.name;
      currentChoice.pic = (hero.thumbnail.path + hero.thumbnail.extension);
      currentChoice.id = hero.id;
    },

    extradetails: function($http){
      $http({
        method: 'GET',
        url: 'https://gateway.marvel.com:443/v1/public/characters/'+hero.id+'/events?apikey=7ac2434b13b9586847ea8973d001c6a6',
      }).then(function (response){
        // $scope.events = response.data.data.results;
        console.log(response.data.data.results);
      });
    },
    setEventName: function(){
      return 
    }
  };
});


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
