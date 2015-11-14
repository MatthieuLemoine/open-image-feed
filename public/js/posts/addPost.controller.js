(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller('AddPostController',AddPostController);

    AddPostController.$inject = ['$mdDialog','ActivitiesFactory','AuthService','PostsFactory','ToastFactory'];

    function AddPostController( $mdDialog, ActivitiesFactory,AuthService,PostsFactory,ToastFactory){
        var vm = this;
        vm.speedDial ={isOpen:false};
        vm.showAddDialog = showAddDialog;
        vm.updateFeed = updateFeed;

        ///////////////

        function showAddDialog(ev) {
            if (!AuthService.isAuthenticated()) {
                AuthService.showLoginDialog();
            }
            else {
                $mdDialog.show({
                        controller: 'PostDialogController',
                        templateUrl: 'partials/dialog',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function addPostDialogConfirm() {
                        ToastFactory.showSimpleToast('Post added !');
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
