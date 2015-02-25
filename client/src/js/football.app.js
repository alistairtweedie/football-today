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
		});
});

angular.module('football').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Auth-Token'] = 'INSERT_API_TOKEN_HERE';
}]);
