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

        this.setSolution = function(solution) {
          $scope.$parent.vm.user.solution_set.push(solution);
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
        
        
        var ready = function() {
          var i = angular.element(element.find('i')[1]);
          i.removeClass();
          i.addClass('fa fa-check fa-2');
        };

        var notReady = function() {
          var i = angular.element(element.find('i')[1]);
          i.removeClass();
          i.addClass('fa fa-times fa-2');
        };
        scope.solution = ctrl.getSolution(scope.task.id);

        scope.$watch('solution.url', function(newValue, oldValue) {
          if(newValue || oldValue) {
            ready();
          };
          
          if(newValue && newValue !== oldValue) {
            scope.solution.url = newValue;
          }
        });

        scope.submit = function() {
          if(typeof scope.solution.id === 'undefined') {
            create();
          }
          else {
            update();
          }
        };

        var create = function() {
          applicationService.createSolution(scope.solution, scope.task.id)
            .then(function(response) {
              ctrl.setSolution(response);
              scope.solution = ctrl.getSolution(scope.task.id);
            });
        };

        var update = function() {
          applicationService.changeSolution(scope.solution)
            .then(function(response) {
              scope.solution = response;
            });
        };
      }
    };
  }
})();
