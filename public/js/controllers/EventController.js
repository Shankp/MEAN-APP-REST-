angular.module('EventController', []).controller('EventController', function($scope,Event) {




      //$scope.tagline = Nerd.get();
    $scope.names;
    $scope.startTime;
    $scope.EndTime;
    $scope.status;
    getEvents();

    //getting all events
    function getEvents()
    {
        Event.get()
        .success(function(eventName){
        $scope.names=eventName;
        })
            .error(function (error) {
                $scope.status = 'Unable to load event data: ';
        });
    }

    //adding new event
    $scope.addEvent = function () {

        var event = {

            name: $scope.name

                    };
        Event.create(event)
            .success(function () {
                $scope.status = 'Inserted event! Refreshing event list.';
                $scope.names.push(event);
            }).
            error(function (error) {
                $scope.status = 'Unable to insert Event: ' + error.message;
            });
         window.location.reload();
    };

    //getting data in specified time
$scope.getEventsOnDate = function(){


};

});
