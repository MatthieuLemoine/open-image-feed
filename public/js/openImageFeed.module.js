(function(){
    'use strict';

    angular
        .module('openImageFeed', [
            'openImageFeed.users',
            'openImageFeed.posts',
            'openImageFeed.activities',
            'ngRoute',
            'ngMaterial',
            'ngFileUpload',
            'ngMessages',
            'validation.match',
            'infinite-scroll'
        ]);
})();
