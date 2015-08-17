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
					controller: 'FixtureController as Fixture',
					resolve: {
						todaysFixtures: ['FixtureService', function (FixtureService) {
							return FixtureService.getTodaysFixtures();
						}]
					}
				}
			}
		});
});

angular.module('football').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth-Token'] = '3fbd5a28d70c480eb8f5c73ba328e16e';
}]);
