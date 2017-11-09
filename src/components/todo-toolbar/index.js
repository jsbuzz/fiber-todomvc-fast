import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import Todo from 'domain/todo';

class TodoToolbarComponent extends Fiber.UIComponent {

    listen() {
        this.on(NameSpace.Todo).listen(
            Events.Todo.Add, event => this.refreshCounter(1),
            Events.Todo.Remove, event => this.todoRemoved(event.todo),
            Events.Todo.StateChange, event => this.stateChanged(event.newState),
        );
        this.ui('#filters').listen(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        event.preventDefault();
        let state = event.target.id.substring(7);
        state === 'all' && (state = null);

        this.on(NameSpace.Todo).triggerSync(
            new Events.Todo.FilterList(state)
        );

        this.resetFilters();
        event.target.className = 'selected';
    }

    resetFilters() {
        this.view.querySelector(`.selected`).className = '';
    }

    todoRemoved(todo) {
        if(!todo.completed) {
            this.refreshCounter(-1);
        }
    }

    stateChanged(newState) {
        this.refreshCounter(newState == Todo.Active ? 1 : -1);
    }

    refreshCounter(increment) {
        let activeCount = increment + parseInt(this.counter.textContent);
        this.counter.textContent = activeCount;
    }
}

export default TodoToolbarComponent;
