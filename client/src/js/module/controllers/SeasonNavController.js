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
		});

		console.log(SeasonNav.seasons);
	}
]);
