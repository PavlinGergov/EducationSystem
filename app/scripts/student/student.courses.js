(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('coursesCtrl', coursesCtrl);
  
  function coursesCtrl(user, studentService, navbar, $state) {
    var vm = this;

    vm.user = user;
    vm.courses = studentService.getCourses(vm.user);
    vm.currentCourse = vm.courses[0];
    vm.menu = navbar.getMenu(vm.user);
    
    activate();
    
    function activate() {
      
      
    };
  };
})();
