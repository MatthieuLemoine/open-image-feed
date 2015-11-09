(function(){
    'use strict';

    angular
        .module('openImageFeed.activities')
        .controller(ActivityCtrl);

    ActivityCtrl.$inject = ['$scope','$interval','ActivitiesFactory'];

    function ActivityCtrl($scope,$interval,ActivitiesFactory){
        var vm = this;
        vm.showLoading = true;
        vm.posts = ActivitiesFactory.activities;
        vm.number = 5;
        vm.offset = ActivitiesFactory.offset;
        vm.numItems = ActivitiesFactory.count;
        vm.isAlreadyLoading = false;
        vm.loadMore = loadMore;

        $interval(updateCount,20000);
        updateCount();

        //////////

        function loadMore(){
            if( vm.offset >= vm.numItems || vm.isAlreadyLoading){
                return;
            }
            vm.isAlreadyLoading = true;
            ActivitiesFactory.getActivities()
                .then(function successLoadMore(){
                    vm.showLoading = false;
                    vm.offset = response.offset;
                    vm.isAlreadyLoading = false;
                },function errorLoadMore(){
                    vm.showLoading = false;
                    $scope.showSimpleToast('Error getting activities');
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