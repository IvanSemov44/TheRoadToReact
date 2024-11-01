import { TodoActions, TodoReducerActions, TodosState } from "./Type";

export const todoReducer = (
    state: TodosState,
    action: TodoReducerActions
) => {
    switch (action.type) {
        case "DO_TODO":
            return state.map(
                todo => todo.id === action.payload.id
                    ? { ...todo, complete: true }
                    : todo);
        case "UNDO_TODO":
            return state.map(
                todo => todo.id === action.payload.id
                    ? { ...todo, complete: false }
                    : todo);
        case "ADD_TODO":
            return state.concat({
                task: action.payload.task,
                id: action.payload.id,
                complete: action.payload.complete
            });
        default:
            throw new Error();
    }
}

export const filterReducer = (
    state: TodosState,
    action: TodoActions
) => {
    switch (action.type) {
        case "SHOW_ALL":
            return "ALL";
        case "SHOW_COMPLETE":
            return "COMPLETE";
        case "SHOW_INCOMPLETE":
            return "INCOMPLETE";
        default:
            throw new Error();
    }
}