(function(){
    'use strict';
    angular
        .module('openImageFeed.activities')
        .factory('ActivitiesFactory',ActivitiesFactory);

    ActivitiesFactory.$inject = ['$http','ActivitiesModel','ToastFactory'];

    function ActivitiesFactory($http,ActivitiesModel,ToastFactory){
        var number = 25;
        return {
            getActivities: getActivities,
            updateFeed: updateFeed,
            updateCount: updateCount
        };

        //////////

        function getActivities(){
            return $http.get('/api/activities',{
                    params: {
                        offset: ActivitiesModel.offset,
                        number: number
                    }
                })
                .then(function successGetPosts (response) {
                    ActivitiesModel.activities = ActivitiesModel.activities.concat(response.data);
                    ActivitiesModel.offset = ActivitiesModel.activities.length;
                    return ActivitiesModel.activities;
                });
        }

        function updateCount(){
            return $http.get('/api/activities/count')
                .then(function successPostCount (response) {
                    var count = response.data.count;
                    ActivitiesModel.count = count;
                    return ActivitiesModel.count;
                });
        }

        function updateFeed(){
            ActivitiesModel.activities = [];
            ActivitiesModel.offset = 0;
            getActivities();
        }
    }
})();
