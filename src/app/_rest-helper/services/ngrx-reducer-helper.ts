import {ExtendedAction} from "../utils/ngrx-rest-utils";
import {GenericAction} from "../actions/generic.action";
import {StudentsAction} from "../../actions/students.action";

export class NgrxReducerHelper {
    public static genericReducer<S, action extends GenericAction>(state: S,
                                                                  action: ExtendedAction<any>,
                                                                  actionClass: new () => action): S {

        // TODO: extend reducer for all actions
        const actionInstance = new StudentsAction();
        // TODO: skip unsupported success / error messages
        switch (action.type) {
            case actionInstance.getActionType("LoadAll", "success"):
                return {
                    ...<any>state,
                    studentList: [].concat((<any>action).payload)
                };
            case actionInstance.getActionType("LoadOne", "success"):
                // TODO: find by ID and replace
                return state;
        }
        return state;
    }
}
