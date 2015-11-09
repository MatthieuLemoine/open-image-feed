(function(){
    'use strict';

    angular.module('openImageFeed', [
      'openImageFeed.controllers',
      'openImageFeed.filters',
      'openImageFeed.services',
      'openImageFeed.directives',
      'ngRoute',
      'ngMaterial',
      'ngFileUpload',
      'ngMessages',
      'validation.match',
      'infinite-scroll'
    ]);

})();