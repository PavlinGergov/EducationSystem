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
        scope.months = profileService.getMonths();
        scope.buyTicket = function() {
          profileService.buyTicket(scope.event)
            .then(function(response) {
              scope.event.ticket = true;
            });
        };
        scope.month = function(date){
          var mnth = scope.months.filter(function(month) {
            return month.number === date.slice(5, 7);
          });
          return mnth[0].name;
        };
      }
    };
  }
})();
