(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller('FeedController',FeedController);

    FeedController.$inject = ['PostsFactory','PostsModel','$interval','ToastFactory'];

    function FeedController(PostsFactory,PostsModel,$interval,ToastFactory){
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
                    ToastFactory.showSimpleToast('Error getting posts');
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
