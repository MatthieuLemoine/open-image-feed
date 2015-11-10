(function(){
    'use strict';
    angular
        .module('openImageFeed.activities')
        .factory('ActivitiesFactory',ActivitiesFactory);

    ActivitiesFactory.$inject = ['$http'];

    function ActivitiesFactory($http){
        var activities = [];
        var offset = 0;
        var number = 5;
        var count = 0;
        return {
            updateCount: updateCount,
            getActivities: getActivities,
            activities: activities,
            offset: offset,
            count: count,
            updateFeed: updateFeed
        };

        //////////

        function getActivities(){
            return $http.get('/api/activities',{
                    params: {
                        offset: offset,
                        number: number
                    }
                })
                .then(function successGetPosts (response) {
                    activities = activities.concat(response.data);
                    offset += activities.length;
                });
        }

        function setNumber(numItems){
            number = numItems;
        }

        function updateCount(){
            return $http.get('/api/activities/count')
                .then(function successPostCount (response) {
                    count = response.data.count;
                });
        }

        function updateFeed(){
            activities = [];
            offset = 0;
            getActivities()
        }
    }
})();