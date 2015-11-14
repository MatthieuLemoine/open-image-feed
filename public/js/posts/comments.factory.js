(function(){
    'use strict';
    angular
        .module('openImageFeed.posts')
        .factory('CommentsFactory',CommentsFactory);

    CommentsFactory.$inject = ['$http'];

    function CommentsFactory($http){
        return {
            addComment: addComment,
            getComments: getComments
        };

        //////////

        function addComment(comment){
            return $http
                    .post('/api/comment', comment);
        }

        function getComments(post){
            return $http
                    .get('/api/comments/'+post._id)
                    .then(function successCallback(response) {
                        return response.data;
                    });
        }
    }
})();
