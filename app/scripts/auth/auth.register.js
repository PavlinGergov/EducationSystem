(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('registerCtrl', registerCtrl);
  
  function registerCtrl(authService, $state, $location, $stateParams) {
    var vm = this;
    vm.user = {};
    vm.register = register;
    
    function register(isFormValid) {
      var fullName = authService.splitName(vm.user.name);
      vm.user.first_name = fullName[0];
      vm.user.last_name = fullName[1];

      if(isFormValid) {
        authService.register(vm.user)
          .then(function() {
            $state.go('activation-msg');
          });
      }
    };
  };
})();
