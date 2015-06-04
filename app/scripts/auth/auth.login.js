(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('loginCtrl', loginCtrl);
  
  function loginCtrl($state, authService, navbar) {
    var vm = this;
    vm.login = login;
    vm.user = {};
    vm.menu = navbar.anonymous();
    
    function login() {
      return authService.login(vm.user)
        .then(function(response) {
          localStorage.setItem('token', response.data.auth_token);
          localStorage.removeItem('from');
          $state.go('profile');
        });
    }
  };
})();
