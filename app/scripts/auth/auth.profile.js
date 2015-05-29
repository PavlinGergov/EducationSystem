(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user) {
    var vm = this;
    vm.user = user;

    console.log(vm.user);
  };
})();
