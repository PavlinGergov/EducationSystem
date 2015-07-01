(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .controller('studentStatisticsCtrl', studentStatisticsCtrl);
  
  function studentStatisticsCtrl($stateParams, tableData, studentService) {
    var vm = this;
    console.log($stateParams);
    activate();
    var emptyTable = tableData.data;
    vm.weekdays = tableData.weekdays;
    
    function activate() {
      vm.courseId = $stateParams.courseId;
      vm.studentId = $stateParams.studentId;
      
      
      studentService.getStudentCheckins(vm.studentId, vm.courseId)
        .then(function(checkins) {
          vm.presence = studentService.getPresenceTable(emptyTable, checkins);
          vm.presencePercentage = studentService.getPresencePercentage(vm.presence);
        });

    };
  };
})();
