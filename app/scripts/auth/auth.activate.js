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
          if(localStorage.from !== undefined) {
            var from = localStorage.getItem('from');
            var url = 'http://' + from + '/#/login';
            localStorage.removeItem('from');
            $window.location.href = url;
          }
          else {
            $state.go('login');
          }
        });
    };
  };
})();
