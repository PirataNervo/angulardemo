(function() {
    var app = angular.module('classRoom', [ ]);

    app.controller('ClassController', function(){
        this.students = [{name: 'Diogo', country: 'Portugal'}, {name: 'Carlos', country: 'Portugal'}, {name: 'Andreas', country: 'Spain'}, {name: 'Antonio', country: 'Spain'}, {name: 'Marta', country: 'Spain'}, {name: 'Panos', country: 'Greece'}, {name: 'Marie', country: 'United Kingdom'}, {name: 'Joana', country: 'Portugal'}, {name: 'Monica', country: 'Poland'}, {name: 'Alberto', country: 'Spain'}, {name: 'Carmen', country: 'Mexico'}];
    });
})();