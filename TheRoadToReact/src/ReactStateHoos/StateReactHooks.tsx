import { useReducer } from 'react'
import Filter from './Filter';
import { initialTodos } from "./Type"
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { filterReducer, todoReducer } from './Reducers';

const StateReactHooks = () => {
    const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
    const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

    const filteredTodos = todos.filter(todo => {
        if (filter === "ALL")
            return true;
        if (filter === "COMPLETE" && todo.complete)
            return true;
        if (filter === "INCOMPLETE" && !todo.complete)
            return true;
    })

    return (
        <div>
            <Filter dispatch={dispatchFilter} />
            <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
            <AddTodo dispatch={dispatchTodos} />
        </div>
    )
}

export default StateReactHooks