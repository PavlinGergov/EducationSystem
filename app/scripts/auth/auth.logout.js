(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('logoutCtrl', logoutCtrl);
  
  function logoutCtrl(authService, $state) {
    var vm = this;
    
    // authService.logout()
    //   .then(function() {
        localStorage.removeItem('token');
        $state.go('home');
    //   });
  };
})();
