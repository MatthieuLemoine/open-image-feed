(function(){
    'use strict';

    angular
        .module('openImageFeed')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['AuthService','ActivitiesFactory','UserModel'];

    function HomeController(AuthService,ActivitiesFactory,UserModel){
        var vm =this;
        vm.auth = UserModel;
        vm.getProfile = getProfile;
        vm.updateActivities = updateActivities;

        getProfile();

        ////////////

        function getProfile(){
            AuthService.profile();
        }

        function updateActivities(){
            console.log("currentUser = "+JSON.stringify(vm.auth));
            console.log("cuurentUser = "+JSON.stringify(UserModel.currentUser));
            ActivitiesFactory.updateFeed();
        }
    }
})();
