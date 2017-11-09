import Fiber from 'fiber';
import {
    AddTodoEvent, StateChangeEvent, TodoEvent, FilterEvent
} from './event-types';

const Events = {};

Events.Todo = {};

Events.Todo.Add = Fiber.defineEvent(AddTodoEvent, 'Todo:Add');
Events.Todo.StateChange = Fiber.defineEvent(StateChangeEvent, 'Todo:StateChange');
Events.Todo.Remove = Fiber.defineEvent(TodoEvent, 'Todo:Remove');
Events.Todo.FilterList = Fiber.defineEvent(FilterEvent, 'TodoList:Filter');


export default Events;
