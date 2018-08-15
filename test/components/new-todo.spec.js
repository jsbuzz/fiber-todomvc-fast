import Fiber from 'fiber';
import NewTodoComponent, { ENTER } from 'components/new-todo';
import NameSpace from 'namespace';
import Events from 'events';

describe('NewTodoComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Fiber.DOM.renderWithComponents(
            '<NewTodoComponent />',
            NewTodoComponent
        );
    });


    it("should trigger Events.Todo.Add when ENTER was pressed", () => {
        wrapper.querySelector
        var keypressEvent = new KeyboardEvent("keypress",{
          "key": "Enter"
        });
        wrapper.dispatchEvent(keypressEvent);

    });

    it("should set to edit mode when double clicking the label", () => {
        const component = new TodoItemComponent(aTodo());

    });

});

let __id = 1;
function aTodo(title, state, id) {
    return new Todo({
        title : title || "todo",
        state : state || Todo.Active,
        id : id || ++__id,
    });
}
