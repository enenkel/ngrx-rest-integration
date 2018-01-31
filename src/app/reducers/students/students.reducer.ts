import {StudentsActions, StudentsActionTypes} from "../../actions/students.action";

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

export function reducer(state: IState = initialState, action: StudentsActions): IState {
    switch (action.type) {
        case StudentsActionTypes.LoadAllStudentsSuccess:
            return {
                ...state,
                studentList: [].concat(action.payload)
            };
        default:
            return state;
    }
}

export const getStudentList = (state: IState) => state.studentList;
