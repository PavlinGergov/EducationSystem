(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('overviewCtrl', overviewCtrl);
  
  function overviewCtrl(tableData, user, studentService, $stateParams) {
    var vm = this;

    activate();
    console.log(user);
    console.log($stateParams);
    
    function activate() {
      var courseId = $stateParams.courseId;
      var studentId = user.student.id;
      var emptyTable = tableData.data;
      vm.weekdays = tableData.weekdays;

      studentService.getStudentCheckins(studentId, courseId)
        .then(function(checkins) {
          vm.presence = studentService.getPresenceTable(emptyTable, checkins);
        });
    };
  };
})();
