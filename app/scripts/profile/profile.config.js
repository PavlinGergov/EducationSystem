(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('check', {
        controller: function(profileService, $state, teacherService) {
          profileService.getProfileData()
            .then(function(response) {
              if(!!response.teacher) {
                var firstCourseId = teacherService.getTeachedCourses(response)[0].id;
                $state.go('teachersDashboard.statistics', { courseId: firstCourseId});
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
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        resolve: {
          user: profileData,
          events: eventsPrep,
          companies: companies,
          cities: cities
        }
      });

    function companies(profileService) {
      return profileService.getCompanies()
        .then(function(response) {
          return response;
        });
    }

    function cities(profileService) {
      return profileService.getCities()
        .then(function(response) {
          return response;
        });
    }

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
