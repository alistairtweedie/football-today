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
