'use strict';

angular.module('football', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('today', {
			url: '/',
			templateUrl: './js/module/partials/fixtures.html',
			controller: 'FixtureController as Fixture',
			resolve: {
				todaysFixtures: function (FixtureService) {
					return FixtureService.getTodaysFixtures();
				}
			}
		})
		.state('mock', {
			url: '/test',
			templateUrl: './js/module/partials/ui-mock.html'
		});
});

angular.module('football').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth-Token'] = '3fbd5a28d70c480eb8f5c73ba328e16e';
}]);

angular.module('football').service('FixtureService', [
	'$http',
	'$q',
	function ($http, $q) {

		function getFixtures(timeFrame) {
			var defered = $q.defer(),
				url = 'http://api.football-data.org/alpha/fixtures';

				if (timeFrame) {
					url += '?timeFrame=' + timeFrame;
				}

			$http.get(url)
				.success(function(data) {
					defered.resolve(data);
				})
				.error(function(data, status) {
					defered.reject({status: status, data: data});
				});
			return defered.promise;
		}

		this.getTodaysFixtures = function () {
			return getFixtures('n1');
		};
	}
]);

// angular.module('app').directive('MainDir', [function () {
// 	return {
// 		restrict: 'A',
// 		link: function (scope, element, attrs) {
// 			console.log('MainDir');
// 		}
// 	};
// }]);

angular.module('football').directive('hideHeader', ['$window', function($window) {
    // Runs during compile
    return {
        link: function($scope, element) {
            var lastScrollTop = 0;

            angular.element($window).bind('scroll', function() {
                var st = $window.pageYOffset;

                if (st > lastScrollTop) {
                    element.addClass('hide-header');
                } else {
                    element.removeClass('hide-header');
                }

               lastScrollTop = st;
            });
        }
    };
}]);

angular.module('football').controller('FixtureController', [
	'todaysFixtures',
	function (todaysFixtures) {
		var fixtures = this;

		todaysFixtures.fixtures.forEach(function(fixture){
			fixture.date = new Date(fixture.date);
		});
		fixtures.todaysFixtures = todaysFixtures.fixtures;
	}
]);
