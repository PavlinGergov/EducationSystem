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
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'login'
          }
        },
        resolve: {
          user: profileData,
          events: eventsPrep
        }
      })
      .state('teacher', {
        url: '/teacher',
        controller: 'teacherCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/profile/profile-teacher.html',
        data: {
          permissions: {
            only: ['teacher'],
            redirectTo: 'profile'
          } 
        },
        resolve: {
          courses: coursesData
        }
      })
      .state('course', {
        url: '/course/:id',
        controller: 'courseCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/profile/profile-course.html',
        data: {
          permissions: {
            only: ['teacher'],
            redirectTo: 'profile'
          } 
        },
        resolve: {
          students: courseStudents,
          lectures: lecturesData
        }
      });

    function coursesData(profileService) {
      return profileService.courses()
        .then(function(response) {
          return response;
        });
    }

    function lecturesData(profileService, $stateParams) {
      return profileService.lectures($stateParams.id)
        .then(function(response) {
          return response.data.map(function(lecture) {
            return lecture.date;
          }).sort();
        });
    }

    function courseStudents(profileService, $stateParams) {
      return profileService.students($stateParams.id)
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
  };
})();
