(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .controller('studentStatisticsCtrl', studentStatisticsCtrl);
  
  function studentStatisticsCtrl($stateParams) {
    var vm = this;
    console.log($stateParams);
    activate();
    
    function activate() {
      
    };
  };
})();
