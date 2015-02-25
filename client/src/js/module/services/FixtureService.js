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
