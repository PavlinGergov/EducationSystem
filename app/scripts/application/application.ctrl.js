(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .controller('applicationCtrl', applicationCtrl);

  function applicationCtrl(user, tasks) {
    var vm = this;

    activate();

    function activate() {
      vm.user = user;
      vm.tasks = tasks;
    };
  }
})();
