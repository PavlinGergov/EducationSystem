(function() {
  'use strict';

  angular
    .module('educationSystemApp.helpers')
    .directive('courseCard', courseCard);

  function courseCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/courseCard.html',
      scope: {
        courses: '='
      },
      controller: function($scope) {
        $scope.icon = function(status) {
          switch(status) {
          case 'taking':
            return 'fa fa-clock-o';
            break;
          case 'dropped':
            return 'fa fa-times';
            break;
          case 'done':
            return 'fa fa-check';
            break;
          }
        };
      }
    };
  };
})();
