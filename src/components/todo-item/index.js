import Fiber from 'fiber';
import Todo from 'domain/todo';
import NameSpace from 'namespace';
import Events from 'events';
import todoHtml from './template.html';
import todoPatch from './todo.patch';
import PatchIt from 'PatchIt';

const todoTemplate = PatchIt.template(todoHtml, todoPatch);

const ENTER = 13, ESCAPE = 27;

class TodoItemComponent extends Fiber.UIComponent {

    init(todo) {
        this.todo = todo;
        this.view = todoTemplate.render(this.todo);
    }

    listen() {
        this.ui('label').listen(
            'dblclick', event => this.setEditMode(true),
        );
        this.ui('.edit').listen(
            'keyup', event => this.onEditorKeyUp(event),
            'blur', event => this.cancelEditor(),
        );
        this.ui('.toggle').listen(
            'click', event => this.toggleState(event),
        );
        this.ui('.destroy').listen(
            'click', event => this.destroy(),
        );
    }

    toggleState(event) {
        this.todo.state = this.view.$.toggle.checked ? Todo.Completed : Todo.Active;
        this.update();
        this.on(NameSpace.Todo).triggerSync(
            new Events.Todo.StateChange(this.todo.state)
        );
    }

    setEditMode(editing) {
        this.view.className = `${this.todo.state} ${editing ? 'editing' : ''}`;
        editing && this.view.$.editor.focus();
    }

    onEditorKeyUp(event) {
        if(event.keyCode == ENTER) {
            this.todo.title = this.view.$.editor.value;
            if(this.view.$.editor.value) {
                this.update();
            } else this.destroy();

        } else if(event.keyCode == ESCAPE) {
            this.cancelEditor()
        }
    }

    cancelEditor() {
        this.setEditMode(false);
        this.view.$.editor.value = this.todo.title;
    }

    update() {
        this.setEditMode(false);
        this.view.apply(this.todo);
    }

    destroy() {
        this.on(NameSpace.Todo).triggerSync(
            new Events.Todo.Remove(this.todo)
        );
    }
}

export default TodoItemComponent;
