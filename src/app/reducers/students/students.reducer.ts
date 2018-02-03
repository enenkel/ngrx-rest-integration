import {StudentsAction} from "../../actions/students.action";
import {NgrxReducerHelper} from "../../_rest-helper/services/ngrx-reducer-helper";
import {ExtendedAction} from "../../_rest-helper/utils/ngrx-rest-utils";

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

export function reducer(state: IState = initialState, action: ExtendedAction<any>): IState {
    return NgrxReducerHelper.genericReducer(state, action, StudentsAction);
}

export const getStudentList = (state: IState) => state.studentList;
