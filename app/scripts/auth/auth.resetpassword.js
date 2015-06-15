(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('resetPasswordCtrl', resetPasswordCtrl);
  
  function resetPasswordCtrl($state, authService) {
    var vm = this;
    vm.lostPassword = lostPassword;
    vm.userData = {};

    function lostPassword() {
      return authService.resetPassword(vm.userData)
        .then(function(data) {
          console.log(vm.userData);
          //$state.go('resetpassword-success');
        });
    }
  };
})();
