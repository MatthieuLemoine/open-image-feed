(function(){
    'use strict';
    angular
        .module('openImageFeed.posts')
        .factory(PostsFactory);

    PostsFactory.$inject = ['$http'];

    function PostsFactory($http){
        var posts = [];
        var offset = 0;
        var number = 5;
        var count = 0;
        return {
            updateCount: updateCount,
            getPosts: getPosts,
            posts: posts,
            offset: offset,
            count: count,
            upvote: upvote,
            downvote: downvote
        };

        //////////

        function downvote(post){
            return $http
                .post('/api/downvote', {post: post._id})
                .then(function successDownvoteCallback(response) {
                    return {
                        status: response.data.status
                    };
                });
        }

        function getPosts(){
            return $http.get('/api/posts',{
                        params: {
                            offset: offset,
                            number: number
                        }
                    })
                    .then(function successGetPosts (response) {
                        posts = posts.concat(response.data);
                        offset += posts.length;
                    });
        }

        function setNumber(numItems){
            number = numItems;
        }

        function updateCount(){
            return $http.get('/api/posts/count')
                .then(function successPostCount (response) {
                    count = response.data.count;
                });
        }

        function updateFeed(){
            posts = [];
            offset = 0;
            getPosts()
        }

        function upvote(post){
            return $http
                    .post('/api/upvote', {post: post._id})
                    .then(function successUpvoteCallback(response) {
                        return {
                            status: response.data.status
                        };
                    });
        }
    }
})();