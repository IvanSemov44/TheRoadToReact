import { ChangeEvent, Dispatch, FC, SyntheticEvent, useState } from 'react'
import { TodoReducerActions } from './Type'
import { v4 as uuidv4 } from "uuid";

interface AddTodoProps {
    dispatch: Dispatch<TodoReducerActions>
}

const AddTodo: FC<AddTodoProps> = ({ dispatch }) => {
    const [task, setTask] = useState("");

    const handleSubmit = (event: SyntheticEvent) => {
        if (task) {
            dispatch({
                type: "ADD_TODO",
                payload: {
                    task,
                    id: uuidv4(),
                    complete: false
                }
            })
        }
        setTask("");
        event.preventDefault();
    }
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default AddTodo