(function() {
  'use strict';

  angular
    .module('educationSystemApp.profile')
    .factory('profileService', profileService);

  function profileService($http, ENV, $filter, $q, Upload) {
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
      getTickets         : getTickets,
      uploadAvatar       : uploadAvatar,
      monthName          : monthName,
      deleteTicket       : deleteTicket
    };

    return service;

    function deleteTicket(ticketId) {
      return $http.delete(ENV.base + 'ticket/'+ticketId+'/')
        .then(function(response) {
          return response.data;
        }, function(error) {
          $q.reject();
          return error;
        });
    }
    
    function monthName(date) {
      var months = getMonths();
      months = months.filter(function(month) {
        return month.number === date.slice(5,7);
      });
      return months[0].name;
    }

    function uploadAvatar(file, obj) {
      return Upload.upload({
        url: ENV.base +'base-user-update/',
        method: 'PATCH',
        fields: {'selection': obj.selection},
        file: file
      })
        .then(function(response) {
          $('#myModal').modal('hide');
          var msg = 'Успешно промени аватара си!';
          toast('success', 'toast-top-right', msg);
          return response.data;
        }, function(error) {
        });
    }

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

      return $http.patch(ENV.education + 'working_at/', data)
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

      return $http.post(ENV.education + 'working_at/', data)
        .then(function(response) {
          return response.data;
        });
    }

    function getCities() {
      return $http.get(ENV.education + 'get-cities/')
        .then(function(response) {
          return response.data;
        });
    }

    function getCompanies() {
      return $http.get(ENV.education + 'get-companies/')
        .then(function(response) {
          return response.data;
        });
    }

    function addNote(data) {
      return $http.post(ENV.education + 'note/', data)
        .then(function(response) {
          var msg = "Успешно добави коментар";
          toast('success', 'toast-top-right', msg);
        }, function(){});
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
      return $http.get(ENV.base + 'event/')
        .then(function(response) {
          return response.data;
        });
    }

    function getTickets() {
      return $http.get(ENV.base + 'ticket/')
        .then(function(response) {
          return response.data;
        }, function(error) {
          $q.reject();
          return error;
        });
    }

    function buyTicket(event) {
      var data = {'event': event.id};
      return $http.post(ENV.base + 'ticket/', data)
        .then(function(response) {
          var msg = 'Успешно взе своя билет за ' + event.name;
          toast('success', 'toast-top-right', msg);
          return response.data;
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

    function getProfileData() {
      return $http.get(ENV.base + 'me/')
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
          'studies_at': user.studies_at,
          'birth_place': user.birth_place,
          'description': user.description
        },
        'application_set': user.application_set,
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
      return $http.get(ENV.base + 'me/')
        .then(function(response) {
          var roles = {
            'isTeacher': !!response.data.teacher,
            'isStudent': !!response.data.student
          };
          return roles;
        });
    }

    function changeMac(mac) {
      var data = {
        'mac': transformMac(mac)
      };
      $http.patch(ENV.education + 'student-update/', data)
       .then(function() {
         toast('success', 'toast-top-right', 'Успешно редактира MAC адреса си!');
       })
       .catch(function() {
         return $q.reject();
       });
    }

    function changePersonalInfo(personalInfo) {
      var data = personalInfo;
      if(data.birth_place && !data.city) {
        data.birth_place = data.birth_place.id;
      }
      else if(!data.birth_place && data.city) {
        data.birth_place = data.city.originalObject.id;
      }
      else if(data.birth_place && data.city){
        data.birth_place = data.city.originalObject.id;
      }
      else {
        data.birth_place = undefined;
      }

      return $http.patch(ENV.base + 'baseuser-update/', data)
        .then(function(response) {
          toast('success', 'toast-top-right', 'Успешно редактира информацията си!');
          return response.data;
        }, function(error) {
          return error;
        });
    }
  }
})();
