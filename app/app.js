(function() {

    angular.module('SpinnersApp', []).controller('MainCtrl', ['$scope', function($scope) {
        console.log('Main');
        $scope.spinners = {};
        $scope.spinners.results = [{
            "name": "Ring",
            "class": "mk-spinner-ring"
        },{
            "name": "Fan",
            "class": "mk-spinner-fan"
        }, {
            "name": "Bubbles",
            "class": "mk-spinner-bubbles"
        }, {
            "name": "Boxes",
            "class": "mk-spinner-boxes"
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

                var clipboard = new Clipboard('.btn-copy',  {
                  text: function(trigger) {

                    var target = angular.element(trigger).attr('data-clipboard-target');
                    target = (target)?document.getElementById(target.slice(1)).innerHTML.trim():angular.element(trigger).attr('data-clipboard-text');

                    return target;
                    
                  }
                });

                clipboard.on('success', function(e) {
                    console.log("SUCCESS");
                    console.log(e);
                    makeAlert(e.text);
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