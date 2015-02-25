angular.module('football').controller('FixtureController', [
	'todaysFixtures',
	function (todaysFixtures) {
		var fixtures = this;
		fixtures.todaysFixtures = todaysFixtures.fixtures;
	}
]);
