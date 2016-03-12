(function() {
    var app = angular.module('classRoom', [ ]);

    app.controller('ClassController', ['$http', function($http){
 	
		this.students = [];
		
		var classController = this; 

		// Get students list from JSON
		$http.get('students.json').success(function(data){
			classController.students = data;
		});

        this.newMember = {};

        this.suspend = function(student) {

            if(confirm('Are you sure you want to suspend this student?'))
            {
                var i;
                for(i=0; i<this.students.length; i++)
                {
                    if (this.students[i].id == student.id)
                    {
                        this.students.splice(i, 1);
                        break;
                    }
                }
            }
        };

        this.add = function() {
            this.newMember.id = this.students.length+1;
            this.students.push(this.newMember);
            this.newMember = {};
        }
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