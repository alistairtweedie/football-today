'use strict';

angular.module('football', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('app', {
			views: {
				'navigation': {
					templateUrl: './js/module/partials/seasonNav.html',
					controller: 'SeasonNavController as SeasonNav',
					resolve: {
						seasons: ['SeasonService', function (SeasonService) {
							return SeasonService.getSeasons();
						}]
					}
				}
			}
		})
		.state('app.today', {
			url: '/',
			views: {
				'content@': {
					templateUrl: './js/module/partials/fixtures.html',
					controller: 'TodayController as Fixture',
					resolve: {
						todaysFixtures: ['FixtureService', function (FixtureService) {
							return FixtureService.getTodaysFixtures();
						}]
					}
				}
			}
		})
		.state('app.fixtures', {
			url: '/league/:leagueId',
			views: {
				'content@': {
					templateUrl: './js/module/partials/fixtures.html',
					controller: 'FixtureController as Fixture',
					resolve: {
						todaysFixtures: ['FixtureService', '$stateParams', function (FixtureService, $stateParams) {
							return FixtureService.getTodaysFixturesForLeague($stateParams.leagueId);
						}]
					}
				}
			}
		});
});

angular.module('football').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth-Token'] = '3fbd5a28d70c480eb8f5c73ba328e16e';
}]);

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
		console.log(todaysFixtures);
		todaysFixtures.fixtures.forEach(function(fixture){
			fixture.date = new Date(fixture.date);
		});
		fixtures.todaysFixtures = todaysFixtures.fixtures;
	}
]);

angular.module('football').controller('SeasonNavController', [
	'seasons',
	function (seasons) {
		var SeasonNav = this;
		SeasonNav.seasons = seasons;

		var germanFlag = 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
			spanishFlag = 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
			englishFlag = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Red_St_George\'s_Cross.svg',
			italianFlag = 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
			frenchFlag = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg';

		SeasonNav.getFlag = function (seasonId) {
			if (!SeasonNav.hasFlag(seasonId)) {
				return undefined;
			}
			return SeasonNav.config[seasonId].flag;
		};

		SeasonNav.hasFlag = function (seasonId) {
			return angular.isDefined(SeasonNav.config[seasonId]) && angular.isDefined(SeasonNav.config[seasonId].flag);
		};

		SeasonNav.config = {
			'BL1': {
				flag: germanFlag,
				orderId: 8

			},
			'BL2': {
				flag: germanFlag,
				orderId: 9

			},
			'FL1': {
				flag: frenchFlag,
				orderId: 6

			},
			'FL2': {
				flag: frenchFlag,
				orderId: 7

			},
			'PL': {
				flag: englishFlag,
				orderId: 1

			},
			'PD': {
				flag: spanishFlag,
				orderId: 3

			},
			'SD': {
				flag: spanishFlag,
				orderId: 4
			}
		};


		SeasonNav.seasons.forEach(function (season) {

			var seasonConf = SeasonNav.config[season.league];
			if(angular.isDefined(seasonConf)) {
				season.orderId = seasonConf.orderId;
			}

			season.id = season._links.self.href.replace('http://api.football-data.org/alpha/soccerseasons/', '');
		});

		console.log(SeasonNav.seasons);
	}
]);

angular.module('football').controller('TodayController', [
	'todaysFixtures',
	function (todaysFixtures) {
		var fixtures = this;
		console.log(todaysFixtures);
		todaysFixtures.fixtures.forEach(function(fixture){
			fixture.date = new Date(fixture.date);
		});
		fixtures.todaysFixtures = todaysFixtures.fixtures;
	}
]);

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

		function getFixturesForLeague(leagueId, timeFrame) {
			var defered = $q.defer(),
				url = 'http://api.football-data.org/alpha/soccerseasons/' + leagueId + '/fixtures';

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


		this.getTodaysFixturesForLeague = function (leagueId) {
			return getFixturesForLeague(leagueId, 'n1');
		};

	}
]);

angular.module('football').service('SeasonService', [
	'$http',
	'$q',
	function ($http, $q) {

		this.getSeasons = function(year) {
			var defered = $q.defer(),
				url = 'http://api.football-data.org/alpha/soccerseasons';

				if (year) {
					url += '?season=' + year;
				}

			$http.get(url)
				.success(function(data) {
					defered.resolve(data);
				})
				.error(function(data, status) {
					defered.reject({status: status, data: data});
				});
			return defered.promise;
		};
	}
]);
