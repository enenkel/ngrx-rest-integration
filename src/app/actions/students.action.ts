import {GenericAction} from "@omm/ngrx-helpers";

export class StudentsAction extends GenericAction {
    public actionName = "Students";
    public resourcePath = "/students";
}
