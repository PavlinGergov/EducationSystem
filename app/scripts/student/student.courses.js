(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('coursesCtrl', coursesCtrl);
  
  function coursesCtrl(user, studentService) {
    var vm = this;
    
    activate();
    
    console.log(vm.courses);
    
    function activate() {
      vm.user = user;
      vm.courses = studentService.getCourses(vm.user);
    };
  };
})();
