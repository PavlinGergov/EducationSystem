(function() {
  'use strict';

  angular
    .module('educationSystemApp.student')
    .controller('overviewCtrl', overviewCtrl);

  function overviewCtrl(tableData, user, studentService, $stateParams, helperService) {
    var vm = this;

    var studentId = user.student.id;
    var emptyTable = tableData.data;
    var courses = helperService.courses(user);
    vm.weekdays = tableData.weekdays;

    activate();

    function activate() {
      if(!$stateParams.courseId) {
        vm.currentCourse = helperService.firstCourse(courses);
        vm.courseId = helperService.firstCourseId(courses);
      }
      else {
        vm.courseId = $stateParams.courseId;
        vm.currentCourse = helperService.courseById(courses, vm.courseId);
      }

      studentService.getStudentCheckins(studentId, vm.courseId)
        .then(function(checkins) {
          vm.presence = studentService.getPresenceTable(emptyTable, checkins);
          vm.presencePercentage = studentService.getPresencePercentage(vm.presence);
        });

    };
  };
})();
