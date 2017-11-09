let _id = 1;

class Todo {
    constructor(properties) {
        this.id = properties.id || ++_id;
        this.title = properties.title;
        this.state = properties.state || Todo.Active;
    }

    clone() {
        return new Todo(this);
    }

    get completed() {
        return this.state == Todo.Completed;
    }
}
Todo.Active = 'active';
Todo.Completed = 'completed';

export default Todo;
