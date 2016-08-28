console.log('file read')

angular.module('utopia', [])
    .directive('utopiaContent', ['uForumAgent', function (uForumAgent) {
        var directive = {
            restrict: 'A',
            link: link
        };

        console.log('directive in module')

        return directive;

        function link(scope, elem, attrs) {
            console.log('link executed')

            function getHtml() {
                return elem.context.innerHTML;
            }

            function runAgent() {
                var html = getHtml()
                uForumAgent.sendIntel(html);
            }

            runAgent();
        }
    }])
    .factory('uForumAgent', ['$q', '$http', function ($q, $http) {
        var service = {
            sendIntel: sendIntel
        };

        return service;

        function sendIntel(htmlSource) {
            getConfig().then(function (config) {
                postIntelToSite(config, htmlSource);
            });
        }

        function getConfig() {
            var defer = $q.defer();

            chrome.storage.sync.get({
                setUrl: '',
                setUsername: '',
                setPassword: '',
                setProvinceName: ''
            }, function (items) {
                defer.resolve(items);
            });

            return defer.promise;
        }

        function postIntelToSite(config, htmlSource) {
            $http.post(
                config.setUrl,
                {
                    username: encodeURIComponent(config.setUsername),
                    password: encodeURIComponent(config.setPassword),
                    forum_name: encodeURIComponent(config.setProvinceName),
                    forum_password: encodeURIComponent(''),
                    bulk_data: encodeURIComponent(htmlSource)
                }
            ).success(function (result) {
                console.log('SUCCESS', result);
                // $http.post(
                //     config.setUrl,
                //     {
                //         username: config.setUsername,
                //         password: config.setPassword,
                //         forum_name: config.setProvinceName,
                //         forum_password: '',
                //         bulk_data: htmlSource
                //     }
                // ).success(function (result) {
                //     console.log('SUCCESS', result);
                // }).error(function (err) {
                //     console.log('ERROR', err);
                // })
            }).error(function (err) {
                console.log('ERROR', err);
            })
        }
    }])
    .controller('MainCtrl', function ($scope) {
        $scope.name = 'World'
    });


function bootstrapAngular() {

    document.getElementById('content-area').setAttribute('utopia-content', '');


    angular.bootstrap(document.body, ['utopia'])
    console.log('bootstrap done')
}

bootstrapAngular();