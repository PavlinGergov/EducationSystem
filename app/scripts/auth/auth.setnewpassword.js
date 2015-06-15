(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('setNewPasswordCtrl', setNewPasswordCtrl);
  
  function setNewPasswordCtrl(authService, $stateParams, $state) {
    var vm = this;
    
    vm.data = $stateParams;
    vm.setNew = setNew;

    function setNew() {
      return authService.setNewPassword(vm.data)
        .then(function(response) {
          console.log(vm.data);
          $state.go('login');
        });
    }
  };
})();
