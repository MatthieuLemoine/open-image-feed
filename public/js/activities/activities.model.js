(function(){
    'use strict';
    angular
        .module('openImageFeed.activities')
        .factory('ActivitiesModel',ActivitiesModel);

    function ActivitiesModel(){
        return {
            activities : [],
            offset     : 0,
            count      : 0
        };
    }
})();
