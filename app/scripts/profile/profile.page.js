(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl(user, cities, companies, ngDialog, profileService, URL, Upload, BASE_URL, navbar, studentService, teacherService, $filter) {
    //TODO: FIX THIS
    var vm = this;
   vm.companies = companies;
   vm.cities = cities;
    vm.months = profileService.getMonths();
    activate();
    
    vm.user = user;
    if(vm.user.isStudent && vm.user.student.courseassignment_set.length > 0) {
      vm.courses = vm.user.student.courseassignment_set;
    }

    if(vm.user.isStudent && vm.user.student.workingat_set) {
      vm.user.student.workingat_set = $filter('orderBy')(vm.user.student.workingat_set, 'start_date', true);
    }
    
    //vm.events = events;
    vm.obj = {
      'src': '',
      'selection': [0, 0, 300, 300, 0, 0],
      'thumbnail': false
    };

    vm.menu = navbar.getMenu(vm.user);

    vm.uploadAvatar = function(file) {
      Upload.upload({
        url: BASE_URL +'base-user-update/',
        method: 'PATCH',
        fields: {'selection': vm.obj.selection},
        file: file,
        headers: {'Authorization': 'Token ' + localStorage.getItem('token')}
      })
        .success(function(response) {
          $('#myModal').modal('hide');
          var msg = 'Успешно промени аватара си!';
          profileService.notification('success', 'toast-top-right', msg);
          vm.user.avatar = response;
        });
    };
    
    vm.buyTicket = function(eventId) {
      profileService.buyTicket(eventId)
        .then(function(response) {
          vm.events = [];
          vm.user.ticket_set.length = 1;
        });
    };

    function activate() {
      
    }
  }
})();
