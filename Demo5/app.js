(function() {
    var app = angular.module('classRoom', [ ]);

    app.controller('ClassController', function(){
        this.students = [
            {id: 1, name: 'Diogo', country: 'Portugal'},
            {id: 2, name: 'Carlos', country: 'Portugal'},
            {id: 3, name: 'Andreas', country: 'Spain'},
            {id: 4, name: 'Antonio', country: 'Spain'},
            {id: 5, name: 'Marta', country: 'Spain'},
            {id: 6, name: 'Panos', country: 'Greece'},
            {id: 7, name: 'Marie', country: 'United Kingdom'},
            {id: 8, name: 'Joana', country: 'Portugal'},
            {id: 9, name: 'Monica', country: 'Poland'},
            {id: 10, name: 'Alberto', country: 'Spain'},
            {id: 11, name: 'Carmen', country: 'Mexico'}
        ];

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
    });
})();