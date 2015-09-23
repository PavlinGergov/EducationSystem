(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.application')
    .controller('applicationCtrl', applicationCtrl);

  function applicationCtrl(user, tasks, courses) {
    var vm = this;

    activate();

    function activate() {
      vm.user = user;
      vm.tasks = tasks;
      vm.courses = courses;
    };
  }
})();
