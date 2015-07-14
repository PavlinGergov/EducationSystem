(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .factory('profileService', profileService);

  function profileService($http, BASE_URL, EDUCATION_URL, URL, $filter) {
    var service = {
      getProfileData: getProfileData,
      changeMac: changeMac,
      changePersonalInfo: changePersonalInfo,
      getEvents: getEvents,
      buyTicket: buyTicket,
      getMe: getMe,
      notification: toast,
      addNote: addNote,
      getCompanies: getCompanies,
      getCities: getCities,
      getMonths: getMonths,
      addPosition: addPosition
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

    function addPosition(worksAt) {
      if(typeof worksAt.company === 'object') {
        worksAt.company = worksAt.company.originalObject.name;
      }
      var data = {
        'company_name': worksAt.company,
        'location': worksAt.location.id,
        'start_date': worksAt.startYear.toString() + '-' + worksAt.startMonth + '-' + '01',
        'title': worksAt.position
      };
      if(!!worksAt.endMonth && !!worksAt.endYear) {
        data.end_date =  worksAt.endYear.toString() + '-' + worksAt.endMonth + '-' + '01';
      };
      
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
      return $http.post(EDUCATION_URL + 'create-student_note/', data, options)
        .success(function(response) {
          var msg = response.message;
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

    function getEvents() {
      return $http.get(BASE_URL + 'get-events/')
        .then(function(response) {
          return filterEvents(response.data);
        });
    }

    function filterEvents(events) {
      return events.filter(function(event) {
          var now = new Date();
          var eventDate = new Date(event.start_date);
            return eventDate > now;
        });
    }

    function buyTicket(eventId) {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      var data = {'event_id': eventId};
      return $http.post(BASE_URL + 'buy-ticket/', data, options)
        .then(function(response) {
          var msg = 'Успешно взе своя билет за HackConf 2015';
          toast('success', 'toast-top-right', msg);
        })
        .catch(function(error) {
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
        })
        .catch(function(error) {
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
        'teacher': user.teacher,
        'competitor': user.competitor,
        'student': user.student
      };

      if(!!user.student) {
        result.student.courseassignment_set = status(user.student.courseassignment_set);
        result.student.courseassignment_set = $filter('orderBy')(result.student.courseassignment_set, 'course.start_time', true);
      }

      if(result.teacher) {
        result.teacher.teached_courses = $filter('orderBy')(result.teacher.teached_courses, 'start_time', true);
      }
      return result;
    }

    function getMe() {
      var options = { headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }};
      return $http.get(BASE_URL + 'me/', options)
        .then(function(response) {
          return response.data;
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
