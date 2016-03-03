var app = angular.module('page',[])
.directive("main", function(){
  return{
    restrict: 'E',
    replace: true,
    scope: false,
    template: '<div></div>',
    compile: function(tElem,tAttrs){
      tElem.append("<h1>{{clock}}</h1>");
      tElem.css("cursor","pointer");
      return {
        pre: function(scope, elem, attrs, ctrl){
          window.pre = scope;
        },
        post: function(scope,elem,attrs,ctrl){
          scope.clock = Date.now();
            console.log(scope);
            window.post = scope;
            window.ctrl = ctrl;
            elem.bind('mouseover',function(){

            });
            elem.bind('mouseenter',function(){
              scope.running && scope.start()
              scope.running && elem.css("color","blue");
              !scope.running && elem.css("color","green");
            });
            elem.bind('mouseleave',function(){
                scope.running && scope.slow();
                scope.running && elem.css("color","black");
                !scope.running && elem.css("color","red");
            });
            elem.bind('click',function(){
              if(scope.running){
                scope.running = false;
                scope.stop();
                elem.css("color","green");
              } else {
                scope.start();
                elem.css("color","blue");
                scope.running = true;
              }
            });
        }
      }
    },
    controller: ['$scope','$interval', function($scope,$interval){
      window.scopetest = $scope;
      $scope.clock = Date.now();
      $scope.running = true;
      $scope.interval = $interval(
        function(){
          $scope.clock = Date.now();
        },
      1000);
      $scope.stop = function(){
        $interval.cancel($scope.interval);
      };

      $scope.start = function(){
        $scope.stop();
        $scope.interval = $interval(function(){
        $scope.clock = Date.now();

      },1);}
      $scope.slow = function(){
        $scope.stop();
        $scope.interval = $interval(function(){
        $scope.clock = Date.now();
      },250);}

    }]
  };
});
