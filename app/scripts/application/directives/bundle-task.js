(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .directive('tasks', task)
    .directive('bundleTask', bundleTask);

  function task() {
    return {
      restrict: 'A',
      controller: function($scope){
        this.getSolution = function(taskId) {
          var sol = $scope.$parent.vm.user.solution_set.filter(function(solution) {
            return solution.task === taskId;
          });
          return sol[0];
        };
        
      }
    };
  }
  
  function bundleTask(applicationService) {
    return {
      restrict: 'E',
      scope: {
        task: '='
      },
      require: '^tasks',
      replace: true,
      templateUrl: 'views/application/directives/bundle-task.html',
      link: function(scope, element, attrs, ctrl) {
        var ready = function(idName) {
          var i = angular.element(element.find('i')[1]);
          i.removeClass();
          i.addClass('fa fa-check fa-2');
        };

        var notReady = function(idName) {
          var i = angular.element(element.find('i')[1]);
          i.removeClass();
          i.addClass('fa fa-times fa-2');
        };
        
        scope.solution = ctrl.getSolution(scope.task.id);
       
        if(scope.solution) {
          ready(scope.task.id);
        }
        else {
          notReady(scope.task.id);
        };
        
        scope.submit = function() {
          scope.solution.id = scope.task.id;
          
          applicationService.createSolution(scope.solution)
            .then(function(response) {
              scope.task.solution = true;
              scope.$parent.vm.user.solution_set.push(response);
            });
        };

        scope.$watch('solution.url', function(newValue, oldValue) {
          if(newValue && newValue !== oldValue) {
            var data = scope.solution;
            data.url = newValue;
            applicationService.changeSolution(data)
              .then(function(response) {
                scope.solution = response;
              });
          }
        });
      }
    };
  }
})();
