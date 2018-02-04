import {GenericAction} from "@omm/ngrx-helpers/src";

export class StudentsAction extends GenericAction {
    public actionName = "Students";
    public resourcePath = "/students";
}
