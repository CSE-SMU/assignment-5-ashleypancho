angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $http, $timeout) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.organicChoices = ["Any", "Yes", "No"];
  $scope.organic = {};
  $scope.organic.index = 0;
  $scope.categories = [
    {
      "id" : 1,
      "name" : "British Origin Ales"
    },
    {
      "id" : 2,
      "name" : "Irish Origin Ales"
    },
    {
      "id" : 3,
      "name" : "North American Origin Ales"
    },
    {
      "id" : 4,
      "name" : "German Origin Ales"
    },
    {
      "id" : 5,
      "name" : "Belgian And French Origin Ales"
    },
    {
      "id" : 6,
      "name" : "International Ale Styles"
    },
    {
      "id" : 7,
      "name" : "European-germanic Lager"
    },
    {
      "id" : 8,
      "name" : "North American Lager"
    },
    {
      "id" : 9,
      "name" : "Other Lager"
    },
    {
      "id" : 10,
      "name" : "International Styles"
    },
    {
      "id" : 11,
      "name" : "Hybrid/mixed Beer"
    },
    {
      "id" : 12,
      "name" : "Mead, Cider, & Perry"
    }
  ];


  $scope.search = {};

  $scope.search.abvGreater = true;
  $scope.search.ibuGreater = true;

  $scope.search = function() {
    var data = {
      hasLabels: "Y"
    };

    if( $scope.search.beername ) {
      data.name = $scope.search.beername;
    }
    if( $scope.search.abv ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.abv = direction + $scope.search.abv;
    }
    if( $scope.search.ibu ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.ibu = direction + $scope.search.ibu;
    }
    if( $scope.organic.index ) {
      if( $scope.organic.index == 1) {
        data.isOrganic = "Y";
      }
      else {
        data.isOrganic = "N";
      }
    }
    if( $scope.search.year ) {
      data.year = $scope.search.year;
    }

     //watching $scope.myResource for changes
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: data
    }).then(function successCallback(response) {
        BeerData.data = response.data.data;
        $state.go('app.results');

      }, function errorCallback(response) {
    });
  };

})

.factory('BeerData', function() {
  return { data: {}, selectedData: 0};
})

.controller('BeersCtrl', function($scope, $state, BeerData) {
  $scope.beers = {};
  $scope.beers.data = BeerData.data;

  console.log(BeerData.data);

  // $scope.beers.beers = [5,7,8];
  console.log("reset");

  $scope.srmColor = function(srmVal) {
    // console.log(srmVal + " " + BeerData.colors[(srmVal)]);
    return {'background-color': BeerData.colors[(srmVal)]};
  }
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  console.log($stateParams.beerId);
  // $scope.spot = $stateParams.beerId;
  $scope.beer = BeerData.data[($stateParams.beerId)];
  $scope.srmColor = function(srmVal) {
    // console.log(srmVal + " " + BeerData.colors[(srmVal)]);
    return {'background': BeerData.colors[(srmVal)]};
  }
  console.log($scope.beer);
});
