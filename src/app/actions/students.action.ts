import {Action} from "@ngrx/store";
import {IStudent} from "../reducers/students";

export enum StudentsActionTypes {
    LoadAllStudents = "[Students] Load all students",
    LoadAllStudentsSuccess = "[Students] Load all students successfully"
}

export class LoadStudents implements Action {
    readonly type = StudentsActionTypes.LoadAllStudents;
}

export class LoadStudentsSuccess implements Action {
    readonly type = StudentsActionTypes.LoadAllStudentsSuccess;

    constructor(public payload: IStudent[]) {
    }
}

export type StudentsActions = LoadStudents | LoadStudentsSuccess;
