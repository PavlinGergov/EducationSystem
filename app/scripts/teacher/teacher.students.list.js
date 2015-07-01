(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .controller('studentsListCtrl', studentsListCtrl);
  
  function studentsListCtrl($stateParams, $state, courseAssignments, teacherService) {
    var vm = this;
    vm.courseAssignments = courseAssignments;

    activate();
    function activate() {
    };
  };
})();
