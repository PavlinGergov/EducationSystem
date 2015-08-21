(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .factory('profileService', profileService);

  function profileService($http, BASE_URL, EDUCATION_URL, URL, $filter, $q) {
    var service = {
      getProfileData     : getProfileData,
      changeMac          : changeMac,
      changePersonalInfo : changePersonalInfo,
      getActiveEvents    : getActiveEvents,
      buyTicket          : buyTicket,
      getMe              : getMe,
      notification       : toast,
      addNote            : addNote,
      getCompanies       : getCompanies,
      getCities          : getCities,
      getMonths          : getMonths,
      addPosition        : addPosition,
      updatePosition     : updatePosition,
      getMonth           : getMonth,
      getYear            : getYear,
      getTickets         : getTickets
    };

    return service;

    function getMonths() {
      var months = [
      {"number":'01',
       "name": "Януари"},
        {"number": "02",
       "name": "Февруари"},
        {"number": "03",
       "name": "Март"},
        {"number": "04",
       "name": "Април"},
        {"number": "05",
         "name": "Май"},
        {"number": "06",
         "name": "Юни"},
        {"number": "07",
         "name": "Юли"},
        {"number": "08",
         "name": "Август"},
        {"number": "09",
         "name": "Септември"},
        {"number": "10",
         "name": "Октомври"},
        {"number": "11",
         "name": "Ноември"},
        {"number": "12",
         "name": "Декември"},
      ];
      return months;
    }

    function updatePosition(position) {
      var data = positionData(position);
      data.working_at_id = position.id;
      
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.patch(EDUCATION_URL + 'working_at/', data, options)
        .then(function(response) {
          return response.data;
        });
    }

    function companyName(company) {
      if(typeof company === 'object') {
        return  company.originalObject.name;
      }
      else {
        return company;
      }
    }

    function afterCourse(position) {
      if(position.afterCourse) {
        return position.course;
      }
      else {
        return '';
      }
    }

    function buildDate(month, year) {
      if(typeof month === 'undefined' || typeof year === 'undefined') {
        return null;
      }
      else {
        return year.toString() + '-' + month + '-01';
      }
    };

    function getMonth(dateStr) {
      var date = dateStr.split('-');
      return date[1];
    };

    function getYear(dateStr) {
      var date = dateStr.split('-');
      return parseInt(date[0]);
    };

    function location(location) {
      if(typeof location === 'object') {
        return location.originalObject.id;
      }
      else {
        return location;
      }
    };

    function positionData(position) {
      var data = {
        'company_name': companyName(position.company_name),
        'location': location(position.location),
        'start_date': buildDate(position.startMonth, position.startYear),
        'title': position.title,
        'description': position.description,
        'came_working': position.came_working,
        'course': afterCourse(position),
        'end_date': buildDate(position.endMonth, position.endYear)
      };
      return data;
    };

    function addPosition(position) {
      var data = positionData(position);
      
      
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.post(EDUCATION_URL + 'working_at/', data, options)
        .then(function(response) {
          return response.data;
        });
    }

    function getCities() {
      return $http.get(EDUCATION_URL + 'get-cities/')
        .then(function(response) {
          return response.data;
        });
    }

    function getCompanies() {
      return $http.get(EDUCATION_URL + 'get-companies/')
        .then(function(response) {
          return response.data;
        });
    }

    function addNote(data) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.post(EDUCATION_URL + 'note/', data, options)
        .success(function(response) {
          var msg = "Успешно добави коментар";
          toast('success', 'toast-top-right', msg);
        })
        .error(function(error) {
        });
    }

    function toast(type, css, msg) {
      toastr.options.positionClass = css;
      toastr[type](msg);
    }

    function errorsNotification(err) {
      Object.keys(err.data).map(function(key) {
        err.data[key].map(function(msg) {
          toast('error', 'toast-top-right', msg);
        });
      });
    }

    function getActiveEvents() {
      return $http.get(BASE_URL + 'event/')
        .then(function(response) {
          return response.data;
        });
    }

    function getTickets() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'ticket/', options)
        .then(function(response) {
          return response.data;
        });
    }

    function buyTicket(event) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {'event': event.id};
      return $http.post(BASE_URL + 'ticket/', data, options)
        .then(function(response) {
          var msg = 'Успешно взе своя билет за ' + event.name;
          toast('success', 'toast-top-right', msg);
        });
    }

    function transformMac(macAddress) {
      return macAddress.toLowerCase().replace(/-/g, ':');
    }

    function getStatus(courseStart, courseEnd, isAttending) {
      var cStart = new Date(courseStart);
      var cEnd = new Date(courseEnd);

      if(isAttending === false) {
        return 'dropped';
      }
      else {
        var now = new Date();
        if(cStart < now && now < cEnd) {
          return 'taking';
        }
        else {
          return 'done';
        }
      }
    }

    function status(courses) {
      courses = courses.map(function(course) {
        course.status = getStatus(course.course.start_time, course.course.end_time, course.is_attending);
        return course;
      });
      return courses;
    }

    //def service methods here
    function getProfileData() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'me/', options)
        .then(function(response) {
          return userData(response.data);
        }, function(error) {
          return $q.reject();
        });
    }

    function userData(user) {
      var result = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'avatar': user.avatar,
        'ticket_set': user.ticket_set,
        'personalInfo': {
          'github_account': user.github_account,
          'linkedin_account': user.linkedin_account,
          'twitter_account': user.twitter_account,
          'studies_at': user.studies_at
        },
        'isTeacher': !!user.teacher,
        'isCompetitor': !!user.competitor && user.competitor.teammembership_set.length > 0,
        'isStudent': !!user.student && user.student.courseassignment_set.length > 0
      };

      if(result.isStudent) {
        result.student = user.student;
        result.student.courseassignment_set = status(user.student.courseassignment_set);
        result.student.courseassignment_set = $filter('orderBy')(result.student.courseassignment_set, 'course.start_time', true);
      }

      if(result.isTeacher) {
        result.teacher = user.teacher;
          result.teacher.teached_courses = $filter('orderBy')(user.teacher.teached_courses, 'start_time', true);
      }

      if(result.isCompetitor) {
        result.competitor = user.competitor;
      }
      return result;
    }

    function getMe() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'me/', options)
        .then(function(response) {
          var roles = {
            'isTeacher': !!response.data.teacher,
            'isStudent': !!response.data.student
          };
          return roles;
        });
    }

    function changeMac(mac) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {
        'mac': transformMac(mac)
      };
      $http.patch(EDUCATION_URL + 'student-update/', data, options)
       .then(function() {
         toast('success', 'toast-top-right', 'Успешно редактира MAC адреса си!');
       })
       .catch(function() {
         return $q.reject();
       });
    }

    function changePersonalInfo(data) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};

      $http.patch(BASE_URL + 'baseuser-update/', data, options)
        .success(function(data) {
          toast('success', 'toast-top-right', 'Успешно редактира информацията си!');
        })
        .error(function(error) {
          return error;
        });
    }
  }
})();
