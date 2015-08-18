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
      },
      link: function(scope, element, attrs) {
        scope.shw = false;
        scope.toggle = function() {
          scope.shw = !scope.shw;
        };
        
      }
    };
  }
  
})();
