(function(){
    'use strict';
    angular
        .module('openImageFeed.posts')
        .factory('PostsFactory',PostsFactory);

    PostsFactory.$inject = ['$http','PostsModel'];

    function PostsFactory($http,PostsModel){
        var number = 5;
        return {
            getPosts: getPosts,
            upvote: upvote,
            downvote: downvote,
            updateFeed: updateFeed,
            updateCount: updateCount
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
                            offset: PostsModel.offset,
                            number: number
                        }
                    })
                    .then(function successGetPosts (response) {
                        PostsModel.posts = PostsModel.posts.concat(response.data);
                        PostsModel.offset = PostsModel.posts.length;
                        return PostsModel.posts;
                    });
        }

        function updateCount(){
            return $http.get('/api/posts/count')
                .then(function successPostCount (response) {
                    PostsModel.count = response.data.count;
                    return PostsModel.count;
                });
        }

        function updateFeed(){
            PostsModel.posts = [];
            PostsModel.offset = 0;
            getPosts();
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
