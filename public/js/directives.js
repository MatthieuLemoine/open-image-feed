'use strict';

/* Directives */

angular.module('openImageFeed.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });


