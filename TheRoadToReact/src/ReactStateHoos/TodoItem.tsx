import { Dispatch, FC } from 'react'
import { Todo, TodoReducerActions } from './Type'

interface TodoItemProps {
    dispatch: Dispatch<TodoReducerActions>,
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ dispatch, todo }) => {
    const handleChange = () => {
        dispatch({
            type: todo.complete ? "UNDO_TODO" : "DO_TODO",
            payload: todo
        })
    }

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={handleChange}
                />
                {todo.task}
            </label>
        </li>
    )
}

export default TodoItem