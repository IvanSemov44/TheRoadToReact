import { v4 as uuidv4 } from "uuid";


export type Todo = {
    id: string;
    task: string;
    complete: boolean;
}

export type Todos = Todo[];

type ShowAllAction = {
    type: "SHOW_ALL"
}

type ShowCompleteAction = {
    type: "SHOW_COMPLETE"

}

type ShowInCompleteAction = {
    type: "SHOW_INCOMPLETE"
}

export type TodoActions = ShowAllAction | ShowCompleteAction | ShowInCompleteAction;

type DoTodoAction = {
    type: "DO_TODO";
    payload: Todo;
}
type UnDoTodoAction = {
    type: "UNDO_TODO";
    payload: Todo;
}
type AddTodoAction = {
    type: "ADD_TODO";
    payload: Todo;
}

export type TodoReducerActions = DoTodoAction | UnDoTodoAction | AddTodoAction;

export type TodosState = Todos;

export const initialTodos: Todos = [
    {
        id: uuidv4(),
        task: "Learn React",
        complete: false
    },
    {
        id: uuidv4(),
        task: "Learn Firebase",
        complete: false
    },
    {
        id: uuidv4(),
        task: "Learn GraphQL",
        complete: false
    }
];