(function() {

    angular.module('SpinnersApp', []).controller('MainCtrl', ['$scope', function($scope) {
        console.log('Main');
        $scope.spinners = {};
        $scope.spinners.results = [{
            "name": "Bubbles",
            "file": "bubbles",
            "class": "mk-spinner-bubbles"
        }, {
            "name": "Window",
            "file": "window",
            "class": "mk-spinner-window"
        }, {
            "name": "Ring",
            "file": "ring",
            "class": "mk-spinner-ring"
        }, {
            "name": "Dots",
            "file": "dots",
            "class": "mk-spinner-dots"
        }, {
            "name": "Boxes",
            "file": "boxes",
            "class": "mk-spinner-boxes"
        }, {
            "name": "Fan",
            "file": "fan",
            "class": "mk-spinner-fan"
        }, {
            "name": "Pie",
            "file": "pie",
            "class": "mk-spinner-pie"
        }, {
            "name": "Ripple",
            "file": "ripples",
            "class": "mk-spinner-ripple"
        }, {
            "name": "Circles",
            "file": "doublecircles",
            "class": "mk-spinner-doublecircle"
        }, {
            "name": "Weight",
            "file": "weight",
            "class": "mk-spinner-weight"
        }];
        var alertCounter, alertDelay = 2, alertInterval;
        var makeAlert = function(msg){
            var alerts = document.getElementsByClassName('mk-alert');
            var alert = null;

            if(alerts.length!==0){
                alert = alerts[0];
            }else{
                alert = document.createElement('DIV');
                alert.setAttribute('class','mk-alert');
                document.body.appendChild(alert);
            }

            alert.innerText = msg;
            alert.style.display = "block";
            if(alertCounter === undefined){
                alertCounter = 0;
            }
            if(alertCounter>0){
                alertCounter -= alertDelay;
            }
            console.log(alertCounter);
            if(!alertInterval){
                alertInterval = setInterval(function(){
                    alertCounter++;
                    if(alertCounter === alertDelay){
                        alert.style.display = "none";
                        clearInterval(alertInterval);
                        alertCounter = 0;
                        alertInterval = undefined;
                    }
                }, 1000);
            }
        };
        $scope.spinners.initCopy = function(last){
            console.log("### Entered ###");
            if(last){

                var clipboard = new Clipboard('.js-btn-copy',  {
                  text: function(trigger) {

                    var target = angular.element(trigger).attr('data-clipboard-target');
                    target = (target)?document.getElementById(target.slice(1)).innerHTML.trim():angular.element(trigger).attr('data-clipboard-text');

                    return target;

                  }
                });

                clipboard.on('success', function(e) {
                    console.log("SUCCESS");
                    console.log(e);
                    // makeAlert(e.text);
                    makeAlert("Copied!");
                });

                clipboard.on('error', function(e) {
                    console.log("ERROR");
                    console.log(e);
                    makeAlert('Error occured while copying! Please try again.');
                });
            }
        };
        $scope.spinners.initCopy(true);
    }]);

})();
