function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

function loadTodos() {
    const todoList = getCookie('todoList');
    if (todoList) {
        try {
            return JSON.parse(todoList);
        } catch {
            return [];
        }
    }
    return [];
}

function saveTodos(todos) {
    setCookie('todoList', JSON.stringify(todos), 365);
}

function renderTodos(todos) {
    const $ftList = $('#ft_list');
    $ftList.empty();
    todos.forEach((todo, idx) => {
        const $div = $('<div></div>')
            .text(todo)
            .addClass('todo-item')
            .on('click', function() {
                if (confirm('Do you want to remove this TO DO?')) {
                    todos.splice(idx, 1);
                    saveTodos(todos);
                    renderTodos(todos);
                }
            });
        $ftList.prepend($div);
    });
}

$(document).ready(function() {
    const todos = loadTodos();
    renderTodos(todos);

    $('#newBtn').on('click', function() {
        const todo = prompt('Enter a new TO DO:');
        if (todo && todo.trim() !== '') {
            todos.unshift(todo.trim());
            saveTodos(todos);
            renderTodos(todos);
        }
    });
});