(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller('FeedController',FeedController);

    FeedController.$inject = ['$scope','PostsFactory','PostsModel','$interval'];

    function FeedController($scope,PostsFactory,PostsModel,$interval){
        var vm = this;
        vm.showLoading = true;
        vm.model = PostsModel;
        vm.isAlreadyLoading = false;
        vm.loadMore = loadMore;

        $interval(PostsFactory.updateCount,20000);
        updateCount();

        //////////

        function loadMore(){
            if( vm.model.offset >= vm.model.count || vm.isAlreadyLoading){
                return;
            }
            vm.isAlreadyLoading = true;
            PostsFactory.getPosts()
                .then(function successLoadMore(){
                    vm.showLoading = false;
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