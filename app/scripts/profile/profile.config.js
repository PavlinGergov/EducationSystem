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
              if(response.teacher !== null) {
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
          user: profileData
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
            only: ['teacher'],
            redirectTo: 'profile'
          }
        }
      });

    function profileData(profileService) {
      return profileService.getProfileData()
        .then(function(response) {
          console.log(response);
          return response;
        });
    }
  };
})();
