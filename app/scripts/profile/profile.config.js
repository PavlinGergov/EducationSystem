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
            }, function(error) {
               localStorage.removeItem('token');
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
          cities: cities,
          tickets: tickets
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
      return profileService.getActiveEvents()
        .then(function(response) {
          return response;
        });
    }

    function profileData(profileService, $state) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        }, function(error) {
          localStorage.removeItem('token');
          $state.go('login');
        });
    }

    function tickets(profileService) {
      return profileService.getTickets()
        .then(function(response) {
          return response;
        });
    }
  }
})();
