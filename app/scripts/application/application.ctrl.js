(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .controller('applicationCtrl', applicationCtrl);

  function applicationCtrl() {
    var vm = this;

    activate();

    function activate() {
      console.log('applicationCtrl');
    };
  }
})();
