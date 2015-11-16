(function(){
    'use strict';
    angular
        .module('openImageFeed.posts')
        .factory('PostsFactory',PostsFactory);

    PostsFactory.$inject = ['$http','PostsModel','ToastFactory'];

    function PostsFactory($http,PostsModel,ToastFactory){
        var number = 5;
        var isLoading = false;
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
                        isLoading = false ;
                        return PostsModel.posts;
                    });
        }

        function updateCount(){
            return $http.get('/api/posts/count')
                .then(function successPostCount (response) {
                    var count = response.data.count;
                    if(count != PostsModel.count && PostsModel.count !== 0){
                        var newPosts = count - PostsModel.count;
                        ToastFactory.showSimpleToast(newPosts+' new posts');
                    }
                    PostsModel.count = count;
                    return PostsModel.count;
                });
        }

        function updateFeed(){
            if(!isLoading){
                isLoading = true ;
                PostsModel.posts = [];
                PostsModel.offset = 0;
                getPosts();
            }
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
