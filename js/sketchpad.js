angular.module('page')
.directive("sketchpad",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'sketchpad.html',
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
