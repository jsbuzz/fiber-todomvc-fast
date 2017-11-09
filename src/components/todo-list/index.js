import Fiber from 'fiber';
import NameSpace from 'namespace';
import Todo from 'domain/todo';
import Events from 'events';
import TodoItemComponent from 'components/todo-item';

class TodoListComponent extends Fiber.UIComponent {

    listen() {
        this.on(NameSpace.Todo).listen(
            Events.Todo.FilterList, event => this.filterTodos(event.state),
            Events.Todo.Add, event => this.addTodo(event.title),
            Events.Todo.Remove, event => this.removeTodo(event.todo),
        );
    }

    addTodo(title) {
        const todo = new Todo({title});
        const todoComponent = new TodoItemComponent(todo);
        const newItem = document.createElement('li');
        newItem.id = `todo-${todo.id}`;
        newItem.appendChild(todoComponent.render());
        this.view.appendChild(newItem);
    }

    removeTodo(todo) {
        this.view.querySelector(`#todo-${todo.id}`).remove();
    }

    filterTodos(state) {
        if(state) {
            this.view.querySelectorAll('li > todo').forEach( todo => {
                todo.parentElement.className = (todo.className == state)
                    ? ''
                    : 'hidden'
                    ;
            });
        } else {
            this.view.querySelectorAll('.hidden').forEach( li => {
                li.className = '';
            });
        }
    }

    clearTodos() {
        this.view.innerHTML = "";
    }
}

export default TodoListComponent;
