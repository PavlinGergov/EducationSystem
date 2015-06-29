(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('overviewCtrl', overviewCtrl);
  
  function overviewCtrl(tableData, user, studentService, $stateParams) {
    var vm = this;
    

    var studentId = user.student.id;
    var emptyTable = tableData.data;
    vm.weekdays = tableData.weekdays;
    

    activate();
    
    function activate() {
      if(!$stateParams.courseId) {
        var currentCourse = studentService.getCourses(user)[0];
        vm.courseId = currentCourse.course.id;
      }
      else {
        vm.courseId = $stateParams.courseId;
      }
      studentService.getStudentCheckins(studentId, vm.courseId)
        .then(function(checkins) {
          vm.presence = studentService.getPresenceTable(emptyTable, checkins);
        });
    };
  };
})();
