(function(){
    'use strict';

    angular
        .module('openImageFeed')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['AuthService','ActivitiesFactory','UserModel','$mdDialog','PostsFactory','ToastFactory'];

    function HomeController(AuthService,ActivitiesFactory,UserModel,$mdDialog,PostsFactory,ToastFactory){
        var vm              = this;
        vm.auth             = UserModel;
        vm.getProfile       = getProfile;
        vm.showAddDialog    = showAddDialog;
        vm.updateActivities = updateActivities;
        vm.updateFeed       = updateFeed;

        getProfile();

        ////////////

        function getProfile(){
            AuthService.profile();
        }

        function showAddDialog(ev) {
            if (!AuthService.isAuthenticated()) {
                AuthService.showLoginDialog();
            }
            else {
                $mdDialog.show({
                        controller          : 'PostDialogController',
                        templateUrl         : 'partials/dialog',
                        parent              : angular.element(document.body),
                        targetEvent         : ev,
                        clickOutsideToClose : true
                    })
                    .then(function addPostDialogConfirm() {
                        ToastFactory.showSimpleToast('Post added !');
                        updateFeed();
                    });
            }
        }

        function updateActivities(){
            ActivitiesFactory.updateFeed();
        }

        function updateFeed(){
            ActivitiesFactory.updateFeed();
            PostsFactory.updateFeed();
        }
    }
})();
