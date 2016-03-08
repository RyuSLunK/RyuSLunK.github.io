angular.module('page')
.directive("artStudio",function(){
  return{
    restrict: 'E',
    replace: false,
    transclude: true,
    templateUrl: 'art-studio.html',
    compile: function(tElem,tAttrs){
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope,elem,attrs,ctrl){
          scope.nav = elem.find("ul");
          scope.workspace = elem.children("div");
        }
      }
    },
    controller: ['$scope', function($scope){
      $scope.easels = [];
      $scope.addEasel = function(canvas_name){
        var canvas_name = (!canvas_name)?prompt("New Easel Name"):canvas_name;
        if(canvas_name != ""){
          $scope.easels.forEach(function(easel){
            if(canvas_name == easel.canvas.id){

              canvas_name = canvas_name + date.now();
            }
          });
        } else {
          canvas_name = "canvas" + date.now();
        }
        $scope.easels.push({id: $scope.easels.length, canvas: {id: canvas_name}});
        //$scope.nav.prepend('<li ng-click="showEasel(' + ($scope.nav.children().length - 1) + ')">' + canvas_name + '</li>');
        //$scope.workspace.append(angular.element("<easel cavas-id='" + canvas_name + "'></easel>"));


      };
      $scope.removeEasel = function(canvas_name){
        console.log("Removing: " + canvas_name);
        var tempEasels = [];
        $scope.easels.forEach(function(easel){
          if(easel.id != canvas_name){
            tempEasels.push(easel);
          }
        });
        $scope.easels = tempEasels;

      };
      $scope.current_id = 0;
      $scope.changeTo = function(id){
        $scope.current_easel = id;
        console.log(id);
      }
      $scope.addEasel("New");
      $scope.changeTo(0);
    }]
  };
})
.directive("sketchTools",function(){
  return{
    restrict: 'E',
    replace: false,
    transclude: false,
    scope: true,
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
.directive("sketchpad",function(){
  return{
    restrict: 'E',
    replace: false,
    templateUrl: 'sketchpad.html',
    transclude: true,
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
.directive("easel",function(){
  return{
    restrict: 'E',
    replace: false,
    transclude: false,
    scope: true,
    compile: function(tElem,tAttrs){
      console.log("EASEL");
      console.log(tElem);
      return {
        pre: function(scope, elem, attrs, ctrl){
          //elem.append(angular.element("<canvas id='" + scope.$parent.canvas + "'></canvas>"));
        },
        post: function(scope,elem,attrs,ctrl){

        }
      }
    },
    controller: ['$scope', function($scope){
      $scope.slider = {};

      $scope.slider = {
        options: {
          start: function(event, ui) {console.log("slider start");},
          stop: function(event, ui) {console.log("slider stop");}
        }
      };

      $scope.tools = [
        {name: "Little Brush", settings: {
          brush: {stroke: {size: 1}}        }},
          {name: "Medium Brush", settings: {
            brush: {stroke: {size: 3}}        }},
            {name: "Big Brush", settings: {
              brush: {stroke: {size: 5}}        }}
      ];
      $scope.propKeys = ['lineWidth','strokeStyle','fillStyle'];
      $scope.$watchGroup(['brushsize','strokecolor','fillcolor'],function(newValues,oldValues,scope){
        var sendData = [];
        for(var i=0;i<newValues.length;i++){
          sendData.push({key: $scope.propKeys[i],value: newValues[i]});
        }
        console.log(sendData);
        $scope.$broadcast('updateContext',sendData);
        console.log("broadcasting");
      });
    window.easelScope = $scope;

    }]
  };
})
.directive("canvas",function(){
  return{
    restrict: 'E',
    replace: false,
    scope: true,
    compile: function(tElem,tAttrs){
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope,elem,attrs,ctrl){
          console.log(scope.$parent.$parent.item.canvas.id);
          elem.prop("id",scope.$parent.$parent.item.canvas.id);
          scope.canvas = document.getElementById(elem.prop("id"));
          scope.context = scope.canvas.getContext('2d');
          if(!elem.parent().prop("id")){
            elem.parent().prop("id",elem.prop("id") + '-easel');
          }
          scope.painting = document.getElementById(elem.parent().prop("id"));
          scope.paint_style = getComputedStyle(scope.painting);
          scope.canvas.width = parseInt(scope.paint_style.getPropertyValue('width'));
          scope.canvas.height = parseInt(scope.paint_style.getPropertyValue('height'));
          scope.mouse = {x: 0, y: 0};
          scope.touch = {x: 0, y: 0};
          scope.context.lineWidth = 3;
          scope.context.lineJoin = 'round';
          scope.context.lineCap = 'round';
          scope.context.strokeStyle = '#00CC99';

          elem.bind('touchstart',function(event){
            console.log("TOUCH STARTED");

            scope.context.beginPath();
            scope.context.moveTo(scope.touch.x, scope.touch.y);
          //  console.log(event);
            elem.bind('touchmove', onTouchPaint);
          });
          elem.bind('touchmove', function(event){
            console.log(event);
            scope.touch.x = event.changedTouches[0].pageX - this.offsetLeft;
            scope.touch.y = event.changedTouches[0].pageY - this.offsetTop;
          });
          elem.bind('mousemove',function(event){
            scope.mouse.x = event.pageX - this.offsetLeft;
            scope.mouse.y = event.pageY - this.offsetTop;
          });
          elem.bind('mousedown', function(event){

            scope.context.beginPath();
            scope.context.moveTo(scope.mouse.x, scope.mouse.y);
            elem.bind('mousemove', onMousePaint);
          });
          elem.bind('mouseup', function(event){
            elem.unbind('mousemove', onMousePaint);
          });
          elem.bind('touchend', function(event){
            elem.unbind('touchmove', onTouchPaint);
          });
          var onMousePaint = function(){

            scope.context.lineTo(scope.mouse.x, scope.mouse.y);
            scope.context.stroke();
          };
          var onTouchPaint = function(){
            scope.context.lineTo(scope.touch.x, scope.touch.y);
            scope.context.stroke();
            console.log("touchpaint");
          };

        }
      }
    },
    controller: ['$scope', function($scope){
      $scope.$on('changeBrushSize',function(event, data){
        $scope.context.lineWidth = data;
        console.log("brush size changed");
      });
      $scope.$on('updateContext',function(event, data){
        console.log("heard broadcast");
        console.log($scope);
        data.forEach(function(item){
          $scope.context[item.key] = item.value;
          console.log($scope.context[item.key]);
        });
      });
    }]
  };
});
