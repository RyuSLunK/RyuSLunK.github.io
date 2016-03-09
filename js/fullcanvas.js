angular.module('page')
.directive('fullcanvas', function(){
  return {
    restrict: 'E',
    replace: 'true',
    compile: function(tElem, tAttrs){
      //compile before rendering the goodies
      return {
        pre: function(scope, elem, attrs, ctrl){

        },
        post: function(scope, elem, attrs, ctrl){
          //generally attach your stuff here
          window.canva = scope;
          elem.append('<div id="fullcanvas-container"><canvas id="fullcanvas"></canvas></div>');
          scope.canvas = document.getElementById('fullcanvas');
          scope.context = scope.canvas.getContext('2d');
          scope.$canvas = elem.children().eq(0).children().eq(0);
          scope.$painting = elem.children().eq(0);
          scope.canvas.height = parseInt(scope.$painting.css("height").replace("px",""));
          scope.canvas.width = parseInt(scope.$painting.css("width").replace("px",""));
          scope.context.lineWidth = 4;
          var p = scope.$painting;
          scope.mouse = {
            x: {},
            y: {}
          };
          window.addEventListener('keypress',function(e){

            if(e.keyCode == 97){
              scope.context.strokeStyle = "black";
            }
            if(e.keyCode == 115){
              scope.context.strokeStyle = "white";
            }
            if(e.keyCode == 100){
              scope.context.strokeStyle = "transparent";
            }
            if(e.keyCode == 102){
              scope.context.clearRect(0,0,scope.canvas.width,scope.canvas.height);
            }
          });

          p.bind('click',function(e){
            //scope.mouse.x = e.pageX - this.offsetLeft;
            //scope.mouse.y = e.pageY - this.offsetTop;

            scope.radius = 0;
            var ripseed = "r" + Date.now().toString();
            scope.mouse.x[ripseed] = e.pageX - this.offsetLeft;
            scope.mouse.y[ripseed] = e.pageY - this.offsetLeft;
            eval(ripGen(ripseed,ripple,"ripple"));
          });
          window.addEventListener('resize',function(){
            scope.canvas.height = parseInt(scope.$painting.css("height").replace("px",""));
            scope.canvas.width = parseInt(scope.$painting.css("width").replace("px",""));a
          });
          var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

        function ripple() {

            if(!scope.ripple){
              scope.ripple = 0;
            }
            var ctx = scope.context;

            ctx.beginPath();
            ctx.arc(scope.mouse.x.ripple, scope.mouse.y.ripple,scope.ripple,0,2*Math.PI,false);
            ctx.stroke();

            if(scope.ripple <= scope.canvas.width){
              scope.ripple += 1;
              requestAnimationFrame(ripple);
            } else {
              //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
              scope.ripple = null;
              scope.mouse.x.ripple = null;
              scope.mouse.y.ripple = null;
              delete scope.ripple;
              delete scope.mouse.x.ripple;
              delete scope.mouse.y.ripple;
            }
          }
          function ripGen(seed,func,replace){

            eval("var funcString = func.toString().replace(/" + replace + "/g,seed)");
            funcString += seed + "();";

            return funcString

          }
        }
      };
    }
  };
});
