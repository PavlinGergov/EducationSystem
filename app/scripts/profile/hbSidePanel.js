(function() {
    'use strict';

    angular
        .module('educationSystemApp.profile')
        .directive('hbSidePanel', hbSidePanel);

    /* @ngInject */
    function hbSidePanel () {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        // Creates:
        // <div data-cc-widget-header=""
        //      title="Avengers Movie"
        //      allow-collapse="true" </div>
        var directive = {
//            link: link,
            require: 'teachedCourses',
            scope: {
                'teachedCourses': '=',
            },
            templateUrl: 'views/profile/hbSidePanel.html',
            restrict: 'E'
        };
        return directive;
    }
//        function link(scope, element, attrs) {
//            attrs.$set('class', 'widget-head');
//        }
})();