(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.student')
    .controller('coursesCtrl', coursesCtrl);
  
  function coursesCtrl(user, studentService, navbar, $state, helperService) {
    var vm = this;

    vm.user = user;
    vm.courses = helperService.courses(vm.user);
    vm.currentCourse = helperService.firstCourse(vm.courses);
    vm.menu = navbar.getMenu(vm.user);
    
    activate();
    
    function activate() {
      
      
    };
  };
})();
