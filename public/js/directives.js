'use strict';

/* Directives */

angular.module('openImageFeed.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })
  .directive("scrollToTopWhen",['$timeout',function ($timeout) {
      return{
        link:function(scope, element, attrs){
          scope.$on(attrs.scrollToTopWhen, function () {
            $timeout(function () {
              angular.element(element)[0].scrollTop = 0;
            });
          });
        }
      };
    }]);