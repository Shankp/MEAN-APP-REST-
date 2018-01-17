angular.module('EventService', []).factory('Event', ['$http', function($http) {

    return {
        // call to get all events
        get : function() {
            return $http.get('/api/events');
        },

        getRead : function() {
            return $http.get('/api/eventRead');
        },
        getEventsOnDate : function() {

            return $http.get('/api/events');
        },
        getUploadRead : function() {
            return $http.get('/api/eventUploadRead');
        },
        getUploadReadNew : function() {
            return $http.get('/api/eventUploadReadNew');
        },
        getfromJavaAPI: function() {
            return $http.get('http://localhost:8084/getsomerest/webresources/service');
        },
        getFromMinJWS: function() {
            return $http.get('http://localhost:30005/myapp/CEPServices/minPrice');
        },
        getFromMaxJWS: function() {
            return $http.get('http://localhost:30005/myapp/CEPServices/maxPrice');
        },
        getFromAvgJWS: function() {
            return $http.get('http://localhost:30005/myapp/CEPServices/avgPrice');
        },
        getFromCountJWS: function() {
            return $http.get('http://localhost:30005/myapp/CEPServices/count');
        },
        getProductFromMinJWS: function(event) {
            //return $http.get('http://localhost:30005/myapp/minMaxProduct/',{params: {maxMinVal:event}});
            return $http.get("http://localhost:30005/myapp/minMaxProduct/"+event);
        },

        getCountFromProductJWS: function(event) {
            //return $http.get('http://localhost:30005/myapp/minMaxProduct/',{params: {maxMinVal:event}});
            return $http.get("http://localhost:30005/myapp/dataCount/"+event);
        },

        // call to POST and create a new event
        create : function(event) {
            return $http.post('/api/events', event);
            $window.location.reload();
        },

        //SENDING READ FILE DATA
        sendFile : function(event) {
            return $http.post('/api/readFilesAsOne', event);
            $window.location.reload();
        },

        ReadUploadFile : function(event) {
            return $http.post('/api/filesReadUploads', event);
            $window.location.reload();
        },
        ReadUploadFileNew : function(event) {
            return $http.post('/api/filesReadUploadsNews', event);
            $window.location.reload();
        },

        ReadSaveWords : function(event) {
            return $http.post('/api/wordsRead', event);
            $window.location.reload();
        },
        //posting to JWS
        postDATAJWS : function(event) {
            return $http.post('/api/wordsRead', event);
            $window.location.reload();
        },

        //posting data to CEP
        postDataToCepFs : function(event) {
            return $http.post('/api/sendDataToCepFs', event);
            $window.location.reload();
        },

        deleteAllData : function() {
            return $http.delete('/api/deleteAll');
        },

        deleteAllDataNew : function() {
            return $http.delete('/api/deleteAllNew');
        },

        // call to DELETE selected event
        delete : function(id) {
            return $http.delete('/api/events/' + id);
        }

    }

}]);
