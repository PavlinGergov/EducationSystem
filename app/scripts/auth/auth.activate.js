(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('activateCtrl', activateCtrl);

  function activateCtrl($stateParams, $state, authService) {
    var vm = this;
    vm.data = $stateParams;

    activate();

    function activate() {
      console.log(vm.data);
      authService.activate(vm.data)
        .then(function(data) {
          localStorage.setItem('token', data.auth_token);
          $state.go('home');
        });
    };
  };
})();
