(function() {

    angular.module('SpinnersApp', []).controller('MainCtrl', ['$scope', function($scope) {
        console.log('Main');
        $scope.spinners = {};
        $scope.spinners.results = [{
            "name": "Ring",
            "class": "mk-spinner-ring"
        }, {
            "name": "Pie",
            "class": "mk-spinner-pie"
        }, {
            "name": "Ripple",
            "class": "mk-spinner-ripple"
        }, {
            "name": "Circles",
            "class": "mk-spinner-doublecircle"
        }, {
            "name": "Weight",
            "class": "mk-spinner-weight"
        }, {
            "name": "Bubbles",
            "class": "mk-spinner-bubbles"
        }, {
            "name": "Boxes",
            "class": "mk-spinner-boxes"
        }];
    }]);

})();