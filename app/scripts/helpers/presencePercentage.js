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
        if(scope.data < 50) {
          element.addClass('label-danger');
        }
        else if(scope.data < 80) {
          element.addClass('label-warning');
        }
        else {
          element.addClass('label-success');
        }
      }
    };
  }
})();
