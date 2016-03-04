angular.module('page')
.directive("game",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'grow-game.html',
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
