(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('presencePercentage', presencePercentage);
  function presencePercentage() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/helpers/presencePercentage.html',
      scope: {
        data: '@'
      },
      link: function(scope, element, attrs) {
        scope.$watch('data', function() {
          if(scope.data < 50) {
            element.removeAttr('class');
            element.addClass('label');
            element.addClass('label-danger');
          }
          else if(scope.data < 80) {
            element.removeAttr('class');
            element.addClass('label');
            element.addClass('label-warning');
          }
          else {
            element.removeAttr('class');
            element.addClass('label');
            element.addClass('label-success');
          }
        });
      }
    };
  }
})();
