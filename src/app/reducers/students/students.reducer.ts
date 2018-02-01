import {Action} from "@ngrx/store";
import {StudentsAction} from "../../actions/students.action";

export interface IStudent {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IState {
    studentList: IStudent[];
}

const initialState: IState = {
    studentList: []
};

export function reducer(state: IState = initialState, action: Action): IState {
    switch (action.type) {
        case new StudentsAction().getAllSuccessType():
            return {
                ...state,
                studentList: [].concat((<any>action).payload)
            };
        case new StudentsAction().getAllErrorType():
            // TODO: this is just for dev, add proper error handler
            return {...state};
        default:
            return state;
    }
}

export const getStudentList = (state: IState) => state.studentList;
