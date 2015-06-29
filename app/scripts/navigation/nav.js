(function() {
  'use strict';

  angular
    .module('educationSystemApp.nav')
    .factory('navbar', navbar);

  function navbar($state) {
    var service = {
      anonymous: anonymous,
      teacher: teacher,
      student: student
    };

    return service;

    function anonymous() {
      var menu = [
        {
          title: "Регистрация",
          action: 'register'
        },
        {
          title: "Вход",
          action: 'login'
        }
      ];
      return menu;
    };

    function teacher() {
      var menu = [
        {
          title: "Dashboard",
          action: 'teacherDashboard'
        },
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };

    function student() {
      var menu = [
        {
          title: "Dashboard",
          action: 'studentDashboard'
        },
        {
          title: "Профил",
          action: 'profile'
        },
        {
          title: "Изход",
          action: 'logout'
        }
      ];
      return menu;
    };
  }
})();
