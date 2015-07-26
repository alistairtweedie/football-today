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
