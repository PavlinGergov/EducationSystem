(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('check', {
        controller: function(profileService, $state) {
          profileService.getProfileData()
            .then(function(response) {
              if(response.teacher) {
                $state.go('teachersDashboard');
              }
              else {
                $state.go('profile');
              }
            })
            .catch(function(error) {
              $state.go('login');
            });
        }
      })
      .state('profile', {
        url:'/profile',
        controller: 'profileCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/profile/profile-student.html',
        resolve: {
          user: profileData,
          events: eventsPrep
        }
      })
      .state('teacherDashboard', {
        url: '/teacher',
        controller: 'teacherCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/profile/profile-teacher.html',
        resolve: {
          user: profileData
        }
      });

    function eventsPrep(profileService) {
      return profileService.getEvents()
        .then(function(response) {
          return response;
        });
    }

    function profileData(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        });
    }
  }
})();
