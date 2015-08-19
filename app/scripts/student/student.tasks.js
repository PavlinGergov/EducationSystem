(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('tasksCtrl', tasksCtrl);
  
  function tasksCtrl(tasks, solutions) {
    var vm = this;
    
    activate();
    
    function activate() {
      vm.tasks = tasks;
      vm.solutions = solutions;
    };
  };
})();
