import Fiber from 'fiber';
import TodoListComponent from 'components/todo-list';
import NewTodoComponent from 'components/new-todo';
import TodoToolbarComponent from 'components/todo-toolbar';

Fiber.app(() => {
    NewTodoComponent.attachTo('#new-todo');
    TodoListComponent.attachTo('#todo-list');
    TodoToolbarComponent.attachTo('#footer');
});

window.Fiber = Fiber;
