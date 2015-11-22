(function(){
    'use strict';
    angular
        .module('openImageFeed')
        .factory('ToastFactory',ToastFactory);

    ToastFactory.$inject = ['$mdToast','$document'];

    function ToastFactory($mdToast,$document){
        var toastPosition = {
                bottom : false,
                top    : true,
                left   : true,
                right  : false
        };

        return {
            showSimpleToast : showSimpleToast
        };

        ////////////

        function getToastPosition() {
            return Object.keys(toastPosition)
                .filter(function(pos) { return toastPosition[pos]; })
                .join(' ');
        }

        function showSimpleToast(message){
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position(getToastPosition())
                    .hideDelay(3000)
                    .parent($document[0].querySelector('.toast-parent'))
            );
        }
    }

})();
