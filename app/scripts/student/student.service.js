(function() {
  'use strict';

  angular
    .module('educationSystemApp.student')
    .factory('studentService', studentService);

  function studentService($http, $filter, ENV) {
    var service = {
      getCourses: getCourses,
      getCourseById: getCourseById,
      getPresenceTable: getPresenceTable,
      getStudentCheckins: getStudentCheckins,
      getLecturesForCourse: getLecturesForCourse,
      getStudentsForCourse: getStudentsForCourse,
      getPresencePercentage: getPresencePercentage,
      getTasks: getTasks,
      getSolutions: getSolutions,
      submitSolution: submitSolution,
      updateSolution: updateSolution
      
    };

    return service;

    function toast(type, css, msg) {
      toastr.options.positionClass = css;
      toastr[type](msg);
    }
    
    function submitSolution(solution) {
      return $http.post(ENV.education + 'solution/', solution)
        .then(function(response) {
          var msg = 'Успешно добави решение';
          toast('success', 'toast-top-right', msg);
          return response.data;
        });
    };

    function updateSolution(solution) {
      return $http.patch(ENV.education + 'solution/' + solution.id + '/', {'url': solution.url})
        .then(function(response) {
          var msg = 'Успешно промени решението си';
          toast('success', 'toast-top-right', msg);
          return response.data;
        });
    };
    
    function getSolutions(courseId) {
      return $http.get(ENV.education + 'solution/?task__course__id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getTasks(courseId) {
      return $http.get(ENV.education + 'task/?course__id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getPresencePercentage(presence) {
      var lecturesCount = 0;
      var presenceCount = 0;
      Object.keys(presence).forEach(function(week) {
       presence[week].forEach(function(lecture) {
         if(lecture !== '') {
           lecturesCount += 1;
           if(lecture.presence) {
             presenceCount += 1;
           }
         }
       });
      });

      var result = Math.round((presenceCount / lecturesCount) * 100);
      if(result) {        
        return result;
      }
      else {
        return 0;
      }
    }

    function getStudentsForCourse(courseId) {
      return $http.get(ENV.education + 'get-students-for-course/?course_id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getCourseById(courseId, user) {
      var currentCourse =  user.student.courseassignment_set.filter(function(course) {
        return course.course.id == courseId;
      });
      return currentCourse[0];
    }

    function getCourses(user) {
      return user.student.courseassignment_set;
    }

    function getPresenceTable(tableData, checkins) {
      var table = angular.copy(tableData);
      checkins.forEach(function(checkin) {
        var weekNum = weekNumber(checkin.date);
        if(table[weekNum]) {
          table[weekNum].map(function(lecture) {
            if(lecture.date === checkin.date) {
              lecture.presence = true;
            }
            return lecture;
          });
        }
      });
      return table;
    }

    function getStudentCheckins(studentId, courseId) {
      return $http.get(ENV.education + 'get-check-ins/?student_id=' + studentId + '&course_id=' + courseId)
        .then(function(response) {
          return response.data;
        });
    }

    function getLecturesForCourse(courseId) {
      return $http.get(ENV.education + 'get-lectures/?course_id=' + courseId)
        .then(function(response) {
          var lectures = getLecturesTillNow(response.data);
          var days = allWeekdays(lectures);
          lectures = transformLectures(lectures);
          return tableData(lectures, days);
        });
    }

    function getLecturesTillNow(lectures) {
      var now = new Date();
      var lectureDates = [];
      lectures.forEach(function(lecture) {
        lectureDates.push(lecture.date);
      });
      lectureDates = lectureDates.sort();

      return lectureDates.filter(function(lecture) {
        var lectureDate = new Date(lecture);
        return lectureDate <= now;
      });
    }

    function allWeekdays(lectures) {
      var weekdays = [];
      var days = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];
      lectures.forEach(function(lecture) {
        var day = new Date(lecture);
        weekdays.push(days[day.getDay()]);
      });

      weekdays = weekdays.filter(function(weekday, pos) {
        return weekdays.indexOf(weekday) == pos;
      });

      weekdays.sort(function(a, b) {
        return days.indexOf(a) > days.indexOf(b);
      });

      return weekdays;
    }

    function weekNumber(date) {
      var weekBigNumber = parseInt($filter('date')(date, 'w')) + 52 * $filter('date')(date, 'y');
      return 'w' + weekBigNumber;
    }


    function transformLectures(lectures) {
      var days = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

      lectures = lectures.map(function(lecture) {
        var lectureDate = new Date(lecture);
        var lectureData = {
          'date': lecture,
          'weekday': days[lectureDate.getDay()],
          'presence': false
        };
        return lectureData;
      });
      return lectures;
    }

    function tableData(lectures, weekdays) {
      var data = {};
      lectures.forEach(function(lecture) {
        var weekNum = weekNumber(lecture.date);
        if(!data[weekNum]) {
          data[weekNum] = Array(weekdays.length).join('.').split('.');
        }
        data[weekNum][weekdays.indexOf(lecture.weekday)] = lecture;
      });
      var result = {'data': data, 'weekdays': weekdays};
      return result;
    }
  }
})();
