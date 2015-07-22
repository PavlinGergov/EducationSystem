(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('challengesCard', challengesCard);
  
  function challengesCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/challengesCard.html',
      scope: {
        challenges: '='
      }
    };
  }

})();
