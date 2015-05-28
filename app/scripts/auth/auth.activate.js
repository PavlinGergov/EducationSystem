(function() {
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('activateCtrl', activateCtrl);

  function activateCtrl($stateParams, $state, authService, $window) {
    var vm = this;
    vm.data = $stateParams;

    activate();

    function activate() {
      authService.activate(vm.data)
        .then(function() {
          if(localStorage.length !== 0) {
            $window.location.href='http://' + localStorage.from + '#/login';
          }
          else {
            $state.go('login');
          }  
        });
    };
  };
})();
