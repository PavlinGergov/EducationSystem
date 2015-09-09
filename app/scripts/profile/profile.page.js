(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl(user, cities, events, tickets, companies, profileService, navbar) {

    var vm = this;

    activate();
    vm.companies = companies;
    vm.cities = cities;
    vm.months = profileService.getMonths();
    vm.user = user;
    if(vm.user.isStudent && vm.user.student.courseassignment_set.length > 0) {
      vm.courses = vm.user.student.courseassignment_set;
    }

    vm.events = events;
    vm.tickets = tickets;

    vm.events = events.map(function(evt) {
      var tkt = vm.tickets.filter(function(ticket) {
        return ticket.event === evt.id;
      });
        evt.ticket = tkt[0];
      return evt;
    });

    vm.obj = {
      'src': '',
      'selection': [0, 0, 300, 300, 0, 0],
      'thumbnail': false
    };

    vm.menu = navbar.getMenu(vm.user);

    vm.uploadAvatar = function(file) {
      profileService.uploadAvatar(file, vm.obj)
        .then(function(response) {
          vm.user.avatar = response;
        });
    };

    function activate() {

    }
  }
})();
