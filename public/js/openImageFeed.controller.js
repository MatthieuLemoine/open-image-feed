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
        vm.currentUser = AuthService.currentUser;
        vm.isAuthenticated = AuthService.isAuthenticated;
        vm.getProfile = getProfile;
        vm.showLoginDialog = showLoginDialog;
        vm.showSimpleToast = showSimpleToast;
        vm.updateActivities = updateActivities;

        vm.getProfile();

        ////////////

        function getProfile(){
            AuthService.profile();
        }

        function getToastPosition() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        }

        function showLoginDialog() {
            $mdDialog.show({
                controller: LoginController,
                templateUrl: 'partials/login',
                parent: angular.element(document.body),
                clickOutsideToClose:true
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