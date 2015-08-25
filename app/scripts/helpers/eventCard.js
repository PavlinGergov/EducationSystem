(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
    .directive('eventCard', eventCard);

  function eventCard(profileService) {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/eventCard.html',
      scope: {
        event: '='
      },
      link: function(scope, element, attrs) {
        scope.buyTicket = function() {
          profileService.buyTicket(scope.event)
            .then(function(response) {
              scope.event.ticket = true;
            });
        };
        scope.month = function(date) {
          return profileService.monthName(date);
        };
      }
    };
  }
})();
