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
              scope.event.ticket = response;
            });
        };
        scope.deleteTicket = function(ticketId) {
          profileService.deleteTicket(ticketId)
            .then(function() {
              scope.event.ticket = undefined;
            });
        };
        scope.month = function(date) {
          return profileService.monthName(date);
        };
      }
    };
  }
})();
