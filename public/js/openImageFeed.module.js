(function(){
    'use strict';

    angular.module('openImageFeed', [
      'openImageFeed.activities',
      'openImageFeed.users',
      'openImageFeed.posts',
      'ngRoute',
      'ngMaterial',
      'ngFileUpload',
      'ngMessages',
      'validation.match',
      'infinite-scroll'
    ]);

})();