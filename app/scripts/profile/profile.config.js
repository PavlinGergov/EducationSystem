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
                $state.go('teacher');
              }
              else {
                $state.go('profile');
              }
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
        },
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        }
      })
      .state('teacher', {
        url: '/teacher',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
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
  };
})();
