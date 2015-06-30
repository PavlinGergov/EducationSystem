(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .controller('studentsListCtrl', studentsListCtrl);
  
  function studentsListCtrl($stateParams, teacherService) {
    var vm = this;
    activate();
    

    teacherService.getCAsForCourse($stateParams.courseId)
      .then(function(response) {
        console.log($stateParams);
        console.log(vm.currentCourseId);
        vm.courseAssignments = response;
      });


    
    function activate() {
      if(!$stateParams.courseId) {
        vm.currentCourseId = 3;
      }
      else {
        vm.currentCourseId = $stateParams.courseId;
      }
    };
  };
})();
