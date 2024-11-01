import { FunctionComponent, Dispatch } from 'react'
import { TodoActions } from './Type'

interface FilterProp {
    dispatch: Dispatch<TodoActions>
}

const Filter: FunctionComponent<FilterProp> = ({ dispatch }) => {

    const handleShowAll = () => {
        dispatch({ type: "SHOW_ALL" })
    }
    const handleShowComplete = () => {
        dispatch({ type: "SHOW_COMPLETE" })
    }
    const handleShowIncomplete = () => {
        dispatch({ type: "SHOW_INCOMPLETE" })
    }

    return (
        <div>
            <button type="button" onClick={handleShowAll}>Show All</button>
            <button type="button" onClick={handleShowComplete}>Show Complete</button>
            <button type="button" onClick={handleShowIncomplete}>Show InComplete</button>
        </div>
    )
}

export default Filter