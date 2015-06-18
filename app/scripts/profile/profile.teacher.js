(function(){
  'use strict';

  angular
    .module('educationSystemApp.auth')
    .controller('teacherCtrl', teacherCtrl);

  function teacherCtrl(courses) {
    var vm = this;
    vm.courses = courses;

  }
})();
