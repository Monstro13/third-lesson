angular
    .module('thirdLesson', [])
    .factory('service', service)
    .controller('appController', appController);


function appController($scope, service) {

    service.getAll().then(function(res) {
        $scope.todos = res.data;
    });

    $scope.todos = [];
    $scope.addTask = addTask;
    $scope.toggleTodo = toggleTodo;

    function addTask() {
        if (!$scope.taskName) return false;

        var task = {

            name: $scope.taskName,
            done: false
        };

        service.add(task).then(function() {
            service.getAll().then(function(res) {
                $scope.todos = res.data;
            });
        });

        $scope.taskName = "";
    }


    function toggleTodo(todo) {
        todo.done = !todo.done;
    }
}

function service($http) {
    return {
        getAll: getAll,
        add: add
    };

    function getAll() {
        return $http.get('/todos');
    }

    function add(todo) {
        return $http.post('/todos', todo);
    }
}