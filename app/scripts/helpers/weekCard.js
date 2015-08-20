(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('weekCard', weekCard);

  function weekCard($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/weekCard.html',
      scope: {
        weekTasks: '=',
        number: '=',
        solutions: '='
      },
      controller: function($scope) {
        this.getSolution = function(taskId) {
          var sol = $scope.solutions.filter(function(solution) {
            return solution.task === taskId;
          });
          return sol[0];
        };
        this.addSolution = function() {
          $scope.sw += 1;
        };
      },
      link: function(scope, element, attrs) {
        scope.shw = false;
        scope.toggle = function() {
          scope.shw = !scope.shw;
        };
        scope.solutionsCount = function() {
          var solutions = [];
          scope.weekTasks.forEach(function(task) {
            var taskSolution = scope.solutions.filter(function(sol) {
              return sol.task === task.id;
            });

            if(taskSolution.length > 0) {
              solutions.push(taskSolution);
            }
          });
          return solutions.length;
        };
        scope.sw = scope.solutionsCount();
      }
    };
  }
  
})();
