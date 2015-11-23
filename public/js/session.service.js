(function(){
    'use strict';

    angular
        .module('openImageFeed')
        .service('Session',Session);

    function Session(){
        this.create = function (sessionId, userId) {
            this.id     = sessionId;
            this.userId = userId;
        };
        this.destroy = function () {
            this.id     = null;
            this.userId = null;
        };
    }
})();
