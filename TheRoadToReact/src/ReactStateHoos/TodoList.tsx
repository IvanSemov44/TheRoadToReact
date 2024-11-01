import { Dispatch, FC } from 'react'
import { TodoReducerActions, Todos } from './Type'
import TodoItem from './TodoItem'

interface TodoListProp {
    dispatch: Dispatch<TodoReducerActions>,
    todos: Todos
}

const TodoList: FC<TodoListProp> = ({ dispatch, todos }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    dispatch={dispatch}
                    todo={todo}
                />
            ))}
        </ul>
    )
}

export default TodoList