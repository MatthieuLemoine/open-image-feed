(function(){
    'use strict';
    angular
        .module('openImageFeed.users')
        .factory('UserModel',UserModel);

    function UserModel(){
        return {
            currentUser: {}
        };
    }
})();
