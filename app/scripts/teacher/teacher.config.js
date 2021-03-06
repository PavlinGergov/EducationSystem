(function() {
  'use strict';

  angular
    .module('educationSystemApp.teacher')
    .config(configure);

  function configure($stateProvider) {
    $stateProvider
      .state('teachersDashboard', {
        url: '/teachers-dashboard',
        controller: 'teacherDashboardCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-dashboard.html',
        data: {
          permissions: {
            only: ['teacher', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          user: profileData
        }
      })
      .state('teachersDashboard.statistics', {
        url: '/statistics/:courseId',
        controller: 'courseStatisticsCtrl',
        controllerAs: 'vm',
        templateUrl: 'views/teacher/teacher-course-statistics.html',
        data: {
          permissions: {
            only: ['teacher', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          user: profileData
        }
      })
      .state('teachersDashboard.students', {
        url: '/students/:courseId',
        controller: 'studentsListCtrl',
        controllerAs: 'slvm',
        templateUrl: 'views/teacher/teacher-student-list.html',
        data: {
          permissions: {
            only: ['teacher', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          courseAssignments: courseAssignmentsData
        }
      })
      .state('teachersDashboard.students.statistics', {
        url: '/:studentId',
        controller: 'studentStatisticsCtrl',
        controllerAs: 'ssvm',
        templateUrl: 'views/teacher/teacher-student-statistics.html',
        data: {
          permissions: {
            only: ['teacher', 'studentAndTeacher'],
            redirectTo: 'check'
          }
        },
        resolve: {
          user: profileData,
          tableData: tableData
        }
      });

    function courseAssignmentsData(teacherService, $stateParams) {
      return teacherService.getCAsForCourse($stateParams.courseId)
      .then(function(response) {
        return response;
      });
    }
    
    function profileData(profileService, $state) {
      return profileService.getProfileData()
        .then(function(response) {
          return response;
        }, function() {
          $state.go('login');
        });
    }

    function tableData($stateParams, studentService) {
      var courseId;
      courseId = $stateParams.courseId;
     
      return studentService.getLecturesForCourse(courseId)
        .then(function(response) {
          return response;
        });
    }
  }
})();
