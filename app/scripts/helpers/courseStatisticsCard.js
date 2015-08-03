(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.helpers')
      .directive('courseStatisticsCard', courseStatisticsCard);
  function courseStatisticsCard() {
    return {
      restrict: 'E',
      templateUrl: 'views/helpers/courseStatisticsCard.html',
      scope: {
        data: '@',
        title: '='
      }
    };
  }
})();
