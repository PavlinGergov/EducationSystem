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

      teacherService.getAvgPresenceForCourseWithDropped(vm.courseId)
        .then(function(avgPresence) {
          vm.avgPresenceWithDropped = avgPresence;
        });

      teacherService.getAvgPresenceForCourseWithoutDropped(vm.courseId)
        .then(function(avgPresence) {
          vm.avgPresenceWithoutDropped = avgPresence;
        });

      teacherService.getCAsForCourse(vm.courseId)
        .then(function(cas) {
          vm.studentsStarted = cas.length;
          vm.studentsDropped = 0;
          cas.forEach(function(ca) {
            if (!ca.is_attending) { vm.studentsDropped += 1; }
          });
          vm.dropRate = vm.studentsDropped / vm.studentsStarted * 100;
        });


    }

  }
})();
