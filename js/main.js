var app = angular.module('page',['ui.slider','colorpicker.module'])
.directive("holder",function(){
  return{
    restrict: 'E',
    replace: true,
    compile: function(tElem,tAttrs){
      return {
        pre: function(scope, elem, attrs, ctrl){
          elem = angular.element(attrs.item);
        },
        post: function(scope,elem,attrs,ctrl){

        }
      }
    },
    controller: ['$scope', function($scope){

    }]
  };
})
.directive("main",function(){
  return{
    restrict: 'E',
    replace: false,
    template: '',
    compile: function(tElem,tAttrs){
      tElem.prepend('<button ng-repeat="item in tabList" ng-click="changeTab(item)">{{item}}</button>');

      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope,elem,attrs,ctrl){

        }
      }
    },
    controller: ['$scope', function($scope){
      $scope.tab = 'home';
      $scope.tabList = ["home","about","game","clock","sketchpad","sandbox"];
      $scope.changeTab = function(tabName){
        $scope.tab = tabName;
      };
    }]
  };
})
.directive("home",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'home.html',
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
})
.directive('satisfiedObjective', function(){
  return {
    restrict: 'A',
    replace: 'true',
    compile: function(tElem, tAttrs){
      //compile before rendering the goodies
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope, elem, attrs, ctrl){
          //generally attach your stuff here
          elem.css("color","green");
          elem.append("<span class='glyphicon glyphicon-ok'></span>");
        }
      };
    }
  };
})
.directive("about",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'about.html',
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
