(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .controller('studentsListCtrl', studentsListCtrl);
  
  function studentsListCtrl($stateParams, teacherService) {
    var vm = this;

    

    teacherService.getCAsForCourse($stateParams.courseId)
      .then(function(response) {
        console.log(response);
        vm.courseAssignments = response;
      });

    activate();
    
    function activate() {
      if(!$stateParams.couseId) {
      }
      else {
        vm.currentCourseId = $stateParams.courseId;
      }
    };
  };
})();
