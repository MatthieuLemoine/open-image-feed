(function(){
    'use strict';

    angular
        .module('openImageFeed.users')
        .controller('LoginController',LoginController);

    LoginController.$inject = ['AuthService', '$mdDialog','ToastFactory'];

    function LoginController(AuthService, $mdDialog,ToastFactory) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: '',
            password_confirm: ''
        };
        vm.hide = hide;
        vm.cancel = cancel;
        vm.validSignin = validSignin;
        vm.validSignup = validSignup;

        /////////

        function cancel() {
            $mdDialog.cancel();
        }

        function hide() {
            $mdDialog.hide();
        }

        function signin(credentials) {
            vm.showLoading = true;
            AuthService.login(credentials).then(function (user) {
                ToastFactory.showSimpleToast("Hello " + user.username + " !");
                vm.showLoading = false;
                hide();
            }, function () {
                vm.showLoading = false;
                ToastFactory.showSimpleToast('Bad credentials');
            });
        }

        function signup(credentials) {
            vm.showLoading = true;
            AuthService.signup(credentials).then(function (user) {
                ToastFactory.showSimpleToast("Welcome " + user.username + " !");
                vm.showLoading = false;
                hide();
            }, function () {
                vm.showLoading = false;
                ToastFactory.showSimpleToast('Username already taken');
            });
        }

        function validSignin(isValid) {
            if (isValid && !vm.showLoading) {
                signin(vm.credentials);
            }
            else {
                if (vm.showLoading) {
                    ToastFactory.showSimpleToast('Connecting...');
                }
                else if (!isValid) {
                    ToastFactory.showSimpleToast('Form invalid');
                }
            }
        }

        function validSignup(isValid) {
            if (isValid && !vm.showLoading) {
                signup(vm.credentials);
            }
            else {
                if (vm.showLoading) {
                    ToastFactory.showSimpleToast('Connecting...');
                }
                else if (!isValid) {
                    ToastFactory.showSimpleToast('Form invalid');
                }
            }
        }
    }
})();
