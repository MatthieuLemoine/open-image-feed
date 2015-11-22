(function(){
    'use strict';
    angular
        .module('openImageFeed.posts')
        .factory('PostsModel',PostsModel);

    function PostsModel(){
        return {
            posts  : [],
            offset : 0,
            count  : 0
        };
    }
})();
