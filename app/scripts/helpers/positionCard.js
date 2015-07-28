(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('positionCard', positionCard);
  
  function positionCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/positionCard.html',
      scope: {
        position: '='
      }
    };
  }

})();
