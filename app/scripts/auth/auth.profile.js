(function() {
  'use strict';
  
  angular
    .module('educationSystemApp.auth')
    .controller('profileCtrl', profileCtrl);
  
  function profileCtrl(user, navbar) {
    var vm = this;
    vm.menu = navbar.user();
    vm.containerId = 'profile-container';
    vm.icon = function(text) {
      if(text === 'done') {
        return 'fa fa-check';
      } else if (text == 'dropped') {
        return 'fa fa-times';
      } else {
        return 'fa fa-clock-o';
      };
    };

    vm.user = {
      first_name: 'Margarita',
      last_name: 'Vasileva',
      email: 'm.vasileva@example.com',
      avatar: 'https://s-media-cache-ak0.pinimg.com/736x/10/61/61/1061614ee7f3a3e64be576c2cc04d13e.jpg',
      social_links: {
        github: 'https://github.com/Shosh',
        twitter: 'https://twitter.com/sho_clk',
        linkedin: '-'        
      },
      courses: [
        {
          name: 'Programming 101',
          during: '03.2015 - 06.2015',
          classes: 15,
          certificate: 'http://view.certificate.com',
          certificate_p: 100,
          status: 'done',
          notes: ''
        },
        {
          name: 'C',
          during: '07.2015 - 10.2015',
          classes: 15,
          certificate: '',
          certificate_p: 0,
          status: 'dropped',
          notes: 'reason'
        },
        {
          name: 'Ruby on Rails',
          during: '07.2015 - 10.2015',
          classes: 15,
          certificate: '',
          certificate_p: 0,
          status: 'taking',
          notes: 'submit solutions'
        }

      ],
      challenges: [
        {
          hackathon: 'HackFMI5',
          team_name: 'Example name',
          idea_description: 'Example idea',
          place: 1
        },
        {
          hackathon: 'HackBulgaria Hackathon',
          team_name: 'Test name',
          idea_description: 'Test idea',
          place: 'N/A'
        }
      ]
    };
  }
})();
