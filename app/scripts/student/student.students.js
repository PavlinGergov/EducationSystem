(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('otherStudentsCtrl', otherStudentsCtrl);
  
  function otherStudentsCtrl(students, studentService) {
    var vm = this;
    vm.students = students;
    
    activate();
    
    function activate() {

    };
  };
})();
