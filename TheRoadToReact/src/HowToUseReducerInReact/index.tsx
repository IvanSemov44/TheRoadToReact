import React, { useReducer } from 'react'

type Todo = {
    id: string;
    task: string;
    complete: boolean;
}

type Todos = Todo[];

const initialTodos: Todos = [
    {
        id: 'a',
        task: "Learn React",
        complete: false
    },
    {
        id: "b",
        task: "Learn Firebase",
        complete: false
    }
];

type DoTodoAction = {
    type: "DO_TODO",
    payload: Todo
}

type UnDOTodoAction = {
    type: "UNDO_TODO",
    payload: Todo
}

type TodoActions = UnDOTodoAction | DoTodoAction;

const todoReducer = (state: Todos, action: TodoActions) => {
    switch (action.type) {
        case "DO_TODO":
            return state.map(todo => todo.id === action.payload.id
                ? { ...todo, complete: true }
                : todo)
        case "UNDO_TODO":
            return state.map(todo => todo.id === action.payload.id
                ? { ...todo, complete: false }
                : todo)
        default:
            return state;
    }
}



const ReducerComponent = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialTodos)

    const handleChange = (todo: Todo) => {
        dispatch({
            type: todo.complete ? "UNDO_TODO" : "DO_TODO",
            payload: todo
        })
    }

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <label>
                        <input type="checkbox"
                            checked={todo.complete}
                            onChange={() => handleChange(todo)}
                        />
                        {todo.task}
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default ReducerComponent;