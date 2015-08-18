(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('tasksCtrl', tasksCtrl);
  
  function tasksCtrl(studentService, $stateParams) {
    var vm = this;
    
    activate();
    
    function activate() {
      studentService.getTasks($stateParams.courseId)
        .then(function(response) {
          vm.tasks = response;
        });

      studentService.getSolutions($stateParams.courseId)
        .then(function(response) {
          vm.solutions = response;
        });
    };
  };
})();
