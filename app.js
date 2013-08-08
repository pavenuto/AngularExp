
// Initialization
(function(window, angular) {

  'use strict';

  window.films = angular.module('films', []);

})(window, window.angular);



// Configuration - routes
(function(films) {

  'use strict';

  // Set the configuration
  films.config(['$routeProvider', function($routeProvider) {

    // List all the routes
    $routeProvider.when('/', {
      templateUrl: 'views/main.html'
    }).
    when('/film/:number', {
      templateUrl: 'views/film.html',
      controller: 'FilmController'
    }).
    // Redirect to a 404 page
    otherwise({
      templateUrl: '404.html',
      controller: 'ErrorController',
      isPublic: true
    });

  }]);

})(window.films);



// Controller - Main
(function(films) {

'use strict';

films.controller('MainController', function($http, $scope) {
  $http.get('films.json').success(function(data) {
    $scope.films = data;
  });
});

})(window.films);


// Controller - Films
(function(films) {

  'use strict';

  films.controller('FilmController', function($scope, $routeParams) {

    $scope.$watch('films', function(films) {
      if (films) {
        $scope.film = films.filter(function(element) {
          return element.number === $routeParams.number;
        })[0];
      }
    });

  });

})(window.films);
