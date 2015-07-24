(function() {
  'use strict';

  angular
    .module('educationSystemApp.helpers')
    .directive('profileCard', profileCard);

  function profileCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/profileCard.html',
      scope: {
        profileData: '='
      },
      transclude: true
    };
  }
})();
