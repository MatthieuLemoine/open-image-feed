(function(){
    'use strict';

    angular
        .module('openImageFeed.posts')
        .controller(DialogController);

    DialogController.$inject = ['$scope','$mdDialog','Upload'];

    function DialogController($scope, $mdDialog, Upload) {
        var vm = this;
        vm.showLoading = false;
        vm.obj = {};
        vm.hide = hide;
        vm.cancel = cancel;
        vm.valid = valid;

        ///////////

        function cancel() {
            $mdDialog.cancel();
        }
        function hide () {
            $mdDialog.hide();
        }
        function valid(isValid) {
            if (isValid && vm.file && !vm.showLoading) {
                upload(vm.file);
            }
            else{
                if(!vm.file){
                    $scope.showSimpleToast('An image is required');
                }
                else if(vm.showLoading){
                    $scope.showSimpleToast('Your post is already uploading');
                }
                else if(!isValid){
                    $scope.showSimpleToast('Form invalid');
                }
            }
        }

        function upload(file) {
            vm.showLoading = true;
            Upload.upload({
                url: '/api/post',
                data: {file: file, title: vm.post.title}
            }).then(function (resp) {
                vm.showLoading = false;
                $mdDialog.hide(true);
            }, function (resp) {
                vm.showLoading = false;
                vm.showSimpleToast('An error occured, image may be to large');
            });
        }
    }
})();