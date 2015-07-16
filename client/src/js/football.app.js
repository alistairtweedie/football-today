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
