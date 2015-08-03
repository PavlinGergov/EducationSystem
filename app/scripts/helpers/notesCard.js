(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('notesCard', notesCard);

  function notesCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/notesCard.html',
      scope: {
        note: '='
      }
    };
  }
})();
