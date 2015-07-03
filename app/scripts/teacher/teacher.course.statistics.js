(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .controller('courseStatisticsCtrl', courseStatisticsCtrl);

  function courseStatisticsCtrl(user, $stateParams, studentService, teacherService) {
    var vm = this;

    activate();

    function activate() {
      vm.user = user;
      if(!$stateParams.courseId) {
        vm.courseId = teacherService.getTeachedCourses(vm.user)[0].id;
      }
      else {
        vm.courseId = $stateParams.courseId;        
      }

      vm.currentCourse = teacherService.getCourseById(vm.user, vm.courseId);

      teacherService.getCAsForCourse(vm.courseId)
        .then(function(cas) {
          vm.stat = teacherService.getStatistics(cas);
        });


    }

  }
})();
