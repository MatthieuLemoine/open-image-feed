(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller('AddPostController',AddPostController);

    AddPostController.$inject = ['$scope','$mdDialog','ActivitiesFactory','AuthService','PostsFactory'];

    function AddPostController($scope, $mdDialog, ActivitiesFactory,AuthService,PostsFactory){
        var vm = this;
        vm.speedDial ={isOpen:false};
        vm.showAddDialog = showAddDialog;
        vm.updateFeed = updateFeed;

        ///////////////

        function showAddDialog(ev) {
            if (!AuthService.isAuthenticated()) {
                $scope.showLoginDialog();
            }
            else {
                $mdDialog.show({
                        controller: 'PostDialogController',
                        templateUrl: 'partials/dialog',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        scope: $scope,
                        clickOutsideToClose: true
                    })
                    .then(function addPostDialogConfirm() {
                        $scope.showSimpleToast('Post added !');
                        updateFeed();
                    });
            }
        }

        function updateFeed(){
            ActivitiesFactory.updateFeed();
            PostsFactory.updateFeed();
        }
    }
})();