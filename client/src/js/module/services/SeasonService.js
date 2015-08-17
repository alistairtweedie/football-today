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
