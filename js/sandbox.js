angular.module('page')
.directive("sandbox",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'sandbox.html',
    compile: function(tElem,tAttrs){
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope,elem,attrs,ctrl){

        }
      }
    },
    controller: ['$scope', function($scope){

    }]
  };
});
