(function(){
    'use strict';

    angular.module('utopia', []).factory('uForumAgent', ForumAgent);

    ForumAgent.$inject = [];

    function ForumAgent() {
        var service = {
            sendIntel: sendIntel
        };

        return service;

        function sendIntel(htmlSource) {
            console.log(htmlSource);
        }
    }
}());