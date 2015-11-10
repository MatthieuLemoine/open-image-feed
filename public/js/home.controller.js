(function(){
    'use strict';

    angular
        .module('openImageFeed')
        .controller('HomeController',HomeController);

    HomeController.$inject = ['$scope','AuthService','$mdDialog','$mdToast','$document','ActivitiesFactory'];

    function HomeController($scope,AuthService,$mdDialog,$mdToast,$document,ActivitiesFactory){
        var vm =this;
        vm.toastPosition = {
            bottom : false,
            top : true,
            left : true,
            right : false
        };
        vm.auth = AuthService;
        //vm.currentUser = AuthService.currentUser;
        //vm.isAuthenticated = AuthService.isAuthenticated;
        vm.getProfile = getProfile;
        $scope.showLoginDialog = showLoginDialog;
        $scope.showSimpleToast = showSimpleToast;
        vm.updateActivities = updateActivities;

        getProfile();

        ////////////

        function getProfile(){
            console.log("Profile");
            AuthService.profile();
        }

        function getToastPosition() {
            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        }

        function showLoginDialog() {
            $mdDialog.show({
                controller: 'LoginController',
                templateUrl: 'partials/login',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                scope: $scope
            });
        }

        function showSimpleToast(message){
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position(getToastPosition())
                    .hideDelay(3000)
                    .parent($document[0].querySelector('#toast-parent'))
            );
        }

        function updateActivities(){
            ActivitiesFactory.updateFeed();
        }

    }
})();