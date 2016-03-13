(function() {
    var app = angular.module('classRoom', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {

        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'index-main.html',
                controller : 'ClassController'
            })

            // route for the about page
            .when('/edit/:id', {
                templateUrl : 'edit.html',
                controller  : 'StudentController'
            });
    });

    // make a factory to share data between controllers
    app.factory('StudentsFactory', function($http){
        var students = {};

        students.list = null;

        students.populate = function() {
            return $http.get('students.json').then(function(response){
                students.list = response.data;
                return students.list;
            });
        }

        students.get = function() {
            return students.list;
        }

        return students;
    });

    app.controller('ClassController', ['$scope', '$http', 'StudentsFactory', function($scope, $http, StudentsFactory) {

        $scope.students = [];

        if(StudentsFactory.list == null) {
            // Remember that the factory has an HTTP call inside which is async,
            // meaning that we need to use 'then' to process the returned data after it's finished
            $scope.getStudents = StudentsFactory.populate().then(function (response) {
                $scope.students = response;
            });
        }
        else
            $scope.students = StudentsFactory.list;

        $scope.newMember = {};

        $scope.suspend = function(student) {

            if(confirm('Are you sure you want to suspend this student?'))
            {
                var i;
                for(i=0; i<$scope.students.length; i++)
                {
                    if ($scope.students[i].id == student.id)
                    {
                        $scope.students.splice(i, 1);
                        break;
                    }
                }
            }
        };

        $scope.add = function() {
            console.log("test");
            $scope.newMember.id = $scope.students.length+1;
            $scope.students.push($scope.newMember);
            $scope.newMember = {};
        };
    }]);

    app.controller('StudentController', ['$scope', '$http', 'StudentsFactory', '$routeParams', '$location', function($scope, $http, StudentsFactory, $routeParams, $location) {

        $scope.students = [];
        $scope.student = {};

        if(StudentsFactory.list == null) {
            // Remember that the factory has an HTTP call inside which is async,
            // meaning that we need to use 'then' to process the returned data after it's finished
            $scope.getStudents = StudentsFactory.populate().then(function(response){
                $scope.students = response;

                var i;
                for(i=0; i<$scope.students.length; i++)
                {
                    if ($scope.students[i].id == $routeParams.id)
                    {
                        // We found our student
                        $scope.student = $scope.students[i];
                    }
                }
            });
        }
        else
        {
            $scope.students = StudentsFactory.list;

            var i = 0;
            for(i=0; i<$scope.students.length; i++)
            {
                if ($scope.students[i].id == $routeParams.id)
                {
                    // We found our student
                    $scope.student = $scope.students[i];
                }
            }
        }

        $scope.edit = function() {
            var i = 0;
            for(i=0; i<StudentsFactory.list.length; i++)
            {
                if (StudentsFactory.list[i].id == $routeParams.id)
                {
                    // We found our student
                    StudentsFactory.list[i] = $scope.student;
                }
            }

            console.log(StudentsFactory.list);

            $location.path('/');
        };
    }]);

    app.directive("listStudents", function() {
        return {
            restrict: 'E',
            templateUrl: "index-list-students.html"
        };
    });

    app.directive("addStudent", function() {
        return {
            restrict: 'E',
            templateUrl: "index-add-student.html"
        };
    });
})();