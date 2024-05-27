document.addEventListener('DOMContentLoaded', function() {
    var todoList = document.getElementById('todo-list');
    var todoInput = document.getElementById('todo-input');
    var addButton = document.getElementById('add-button');
    var todoCount = 0;

    function fetchTasks() {
        const apiUrl = 'https://example.com/api/todos';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(task => addTodoToDOM(task.description, task.completed));
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    function addTodoToDOM(description, completed) {
        var todoCol = document.createElement('div');
        todoCol.setAttribute('class', 'col-xs-12 todo');
        if (completed) {
            todoCol.classList.add('completed');
        }

        var todoRow = document.createElement('div');
        todoRow.setAttribute('class', 'row');

        var h5 = document.createElement('h5');
        h5.setAttribute('class', 'col-xs-6');
        h5.innerHTML = description;

        var completeButton = document.createElement('button');
        completeButton.setAttribute('class', 'btn btn-success complete-button');
        completeButton.innerHTML = completed ? 'Mark Active' : 'Mark Complete';
        completeButton.onclick = function() {
            todoCol.classList.toggle('completed');
            completeButton.innerHTML = todoCol.classList.contains('completed') ? 'Mark Active' : 'Mark Complete';
        };

        var removeButton = document.createElement('button');
        removeButton.setAttribute('class','btn btn-danger remove-button');
        removeButton.innerHTML = "REMOVE";
        removeButton.onclick = function() {
            var child = this.parentNode.parentNode;
            todoList.removeChild(child);
        };

        todoRow.appendChild(h5);
        todoRow.appendChild(completeButton);
        todoRow.appendChild(removeButton);
        todoCol.appendChild(todoRow);
        todoList.appendChild(todoCol);
        todoCount++;
    }

    function checkThenAddTodo() {
        if (todoCount < 10 && todoInput.value !== '') {
            addTodoToDOM(todoInput.value, false);
            todoInput.value = '';
        }
    }

    addButton.addEventListener('click', checkThenAddTodo);
    todoInput.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            checkThenAddTodo();
        }
    });

    fetchTasks(); // Fetch and display tasks on page load
});