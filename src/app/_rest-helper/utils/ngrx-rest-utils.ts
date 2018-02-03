import {GenericAction, GenericActionTypes} from "../actions/generic.action";
import {Action} from "@ngrx/store";

// TODO: make generic type optional
export class ExtendedAction<P> implements Action {
    readonly type: string;
    readonly actionType: GenericActionTypes;
    readonly payload?: P;
}

export class NgrxRestUtils {

    /**
     * Get an actionInstance with the correct type and payload, based on the actionclass and the actionType
     *
     * @param {{new(): action}} actionClass
     * @param {GenericActionTypes} actionType
     * @param {P} payload
     * @param {boolean} onlyType If true, ignores payload and just returns the type property.
     * @return {Action}
     */
    public static createActionInstance<action extends GenericAction, P>(actionClass: new () => action,
                                                                        actionType: GenericActionTypes,
                                                                        payload?: P,
                                                                        onlyType: boolean = false): ExtendedAction<P> {
        const instance: action = new actionClass();
        const type = instance.getActionType(actionType);

        if (onlyType || payload == null) {
            // In some cases, we just want the action with type and ignore the payload
            return {type, actionType};
        }

        /**
         * Validate payload with
         */

        return {type, actionType, payload};
    }
}