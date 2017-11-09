import Fiber from 'fiber';
import { Optional } from 'fiber/domain';
import Todo from 'domain/todo';

export const FilterEvent = Fiber.defineEventType({
    state: Optional(String)
});

export const ActiveCount = Fiber.defineEventType({
    activeCount: Number
});

export const TodoEvent = Fiber.defineEventType({
    todo: Todo
});

export const AddTodoEvent = Fiber.defineEventType({
    title: String
});

export const StateChangeEvent = Fiber.defineEventType({
    newState: String
});
