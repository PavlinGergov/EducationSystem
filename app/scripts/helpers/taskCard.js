(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('taskCard', taskCard);

  function taskCard(studentService, $stateParams) {
    return {
      restrict: 'EA',
      require: '^weekCard',
      templateUrl: 'views/helpers/taskCard.html',
      scope: {
        task: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.solution = ctrl.getSolution(scope.task.id);
        scope.submit = function() {
          if(typeof scope.solution.task === 'undefined') {
            scope.solution.task = scope.task.id;
            studentService.submitSolution(scope.solution)
              .then(function(response) {
                scope.solution = response;
              });
          }
          else {
            studentService.updateSolution(scope.solution)
              .then(function(response) {
                scope.solution = response;
              });
          }
        };
      }
    };
  }
})();
