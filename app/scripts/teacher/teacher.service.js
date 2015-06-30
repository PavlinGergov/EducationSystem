(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.teacher')
    .factory('teacherService', teacherService);
  
  function teacherService($http) {
    var service = {
      serviceMethod: serviceMethod
    };
    
    return service;
    
    //def service methods here
    function serviceMethod() {
      
    }
  }
})();
