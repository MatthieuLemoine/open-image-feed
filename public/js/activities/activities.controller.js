(function(){
    'use strict';

    angular
        .module('openImageFeed.activities')
        .controller('ActivityController',ActivityController);

    ActivityController.$inject = ['$interval','ActivitiesFactory','ActivitiesModel','ToastFactory'];

    function ActivityController($interval,ActivitiesFactory,ActivitiesModel,ToastFactory){
        var vm = this;
        vm.showLoading = true;
        vm.model = ActivitiesModel;
        vm.isAlreadyLoading = false;
        vm.loadMore = loadMore;

        $interval(ActivitiesFactory.updateCount,20000);
        updateCount();

        //////////

        function loadMore(){
            if( vm.model.offset >= vm.model.count || vm.isAlreadyLoading){
                return;
            }
            vm.isAlreadyLoading = true;
            ActivitiesFactory.getActivities()
                .then(function successLoadMore(){
                    vm.showLoading = false;
                    vm.isAlreadyLoading = false;
                },function errorLoadMore(){
                    vm.showLoading = false;
                    ToastFactory.showSimpleToast('Error getting activities');
                });
        }

        function updateCount(){
            ActivitiesFactory.updateCount()
                .then(function successUpdateCount(){
                    loadMore();
                });
        }

    }
})();
