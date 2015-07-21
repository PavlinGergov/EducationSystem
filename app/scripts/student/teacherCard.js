(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .directive('profileCard', profileCard);

  function profileCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/student/teacherCard.html',
      scope: {
        teacherInfo: '='
      },
      transclude: true
    };
  }
})();
