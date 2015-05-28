(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(authService) {
    console.log("fostataaaa")
    var vm = this;
    vm.user = {};

  };
})();
