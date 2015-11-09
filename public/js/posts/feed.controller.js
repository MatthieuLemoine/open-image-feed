(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller(FeedController);

    FeedController.$inject = ['$scope','PostsFactory'];

    function FeedController($scope,PostsFactory){
        var vm = this;
        vm.showLoading = true;
        vm.posts = PostsFactory.posts;
        vm.number = 5;
        vm.offset = PostsFactory.offset;
        vm.numItems = PostsFactory.count;
        vm.isAlreadyLoading = false;
        vm.loadMore = loadMore;

        updateCount();

        //////////

        function loadMore(){
            if( vm.offset >= vm.numItems || vm.isAlreadyLoading){
                return;
            }
            vm.isAlreadyLoading = true;
            PostsFactory.getPosts()
                .then(function successLoadMore(){
                    vm.showLoading = false;
                    vm.offset = response.offset;
                    vm.isAlreadyLoading = false;
                },function errorLoadMore(){
                    vm.showLoading = false;
                    $scope.showSimpleToast('Error getting posts');
                });
        }

        function updateCount(){
            PostsFactory.updateCount()
                .then(function successUpdateCount(){
                    loadMore();
                });
        }
    }
})();