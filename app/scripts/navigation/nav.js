(function() {
  'use strict';

  angular
    .module('educationSystemApp.nav')
    .factory('navbar', navbar);

  function navbar($state) {
    var service = {
      anonymous: anonymous,
      user: user
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

    function user() {
      var menu = [
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
