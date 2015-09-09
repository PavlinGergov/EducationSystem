(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .controller('applyCtrl', applyCtrl);

  function applyCtrl(bundles, user, navbar, applicationService) {
    var vm = this;
    activate();

    function activate() {
      vm.bundles = bundles;
      vm.menu = navbar.getMenu(user);
      
    }
  }
})();
