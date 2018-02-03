import {Injectable} from "@angular/core";
import {OperatorFunction} from "rxjs/interfaces";
import {GenericAction, GenericActionTypes} from "../actions/generic.action";
import {Action} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import {NgrxRestDataService} from "./ngrx-rest-data.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {pipe} from "rxjs/RX";
import {ExtendedAction} from "../utils/ngrx-rest-utils";

@Injectable()
export class NgrxEffectHelper {

    constructor(private ngrxRestDataService: NgrxRestDataService) {
    }

    /**
     * Adds default ngrx ofType selector for all action types provided.
     * @param {{new(): action}} actionClass The ActionClass which should be handled (extending GenericAction).
     * @param {GenericActionTypes | GenericActionTypes[]} actionTypes One or more action types which should be handled.
     * @return {OperatorFunction<Action, Action>} The generated ofType selector.
     */
    selectAction<action extends GenericAction>(actionClass: new () => action,
                                               actionTypes: GenericActionTypes | GenericActionTypes[]): OperatorFunction<Action, Action> {
        actionTypes = [].concat(actionTypes);
        const actionInstance = new actionClass();
        const typeArray = actionTypes.map((actionType: GenericActionTypes) => actionInstance.getActionType(actionType));
        return ofType(...typeArray);
    }

    // TODO: add parameter to specify action Type
    // TODO: implement retry logic
    // TODO: use payload for specific request
    // TODO: user mergemap / switchMap via options to prevent request abort
    executeRequest<action extends GenericAction, R>
    (actionClass: new () => action): OperatorFunction<ExtendedAction<R>, ({ response: R, actionType: string })> {
        return mergeMap((actionObject: ExtendedAction<any>) => {
            const actionInstance = new actionClass();
            // we need to forward the actionType to later operators, so the response can be handled properly.
            return this.ngrxRestDataService.loadAll<R>(actionInstance.resourcePath)
                .pipe(map((response: R) => ({response, actionType: actionObject.actionType})));
        });
    }


    /**
     * Creates the success action for the specified actionClass and actionType.
     * @param {{new(): action}} actionClass The action class which specifies the base action type.
     * @return {OperatorFunction<any, Action>} The generated map statement, mapping the input response to a success action.
     */
    handleSuccessResponse<action extends GenericAction>(actionClass: new () => action): OperatorFunction<any, Action> {
        return map(({response, actionType}) => ({
            type: new actionClass().getActionType(actionType, "success"),
            payload: response
        }));
    }

    /**
     * Creates the error action for the specified actionClass and actionType.
     * @param {{new(): action}} actionClass The action class which specifies the base action type.
     * TODO: merge this with multi ofType
     * @param {GenericActionTypes} actionType
     * @return {OperatorFunction<Action, Action>}
     */
    handleErrorResponse<action extends GenericAction>(actionClass: new () => action): OperatorFunction<Action, Action> {
        return catchError(({err, actionType}) => of({
            type: new actionClass().getActionType(actionType, "success"),
            payload: err
        }));
    }

    /**
     * TODO: skip specific steps
     *
     * skipErrorHandling: boolean = false,
     * skipSuccessHandling: boolean = false,
     * skipExecuteRequest: boolean = false

     * @param {{new(): action}} actionClass
     * @param {GenericActionTypes} actionType
     * @return {OperatorFunction<Action, Action>}
     */
    handle<action extends GenericAction>(actionClass: new () => action,
                                         actionType: GenericActionTypes): OperatorFunction<Action, Action> {
        return pipe(
            this.selectAction(actionClass, actionType),
            this.executeRequest(actionClass),
            this.handleSuccessResponse(actionClass),
            this.handleErrorResponse(actionClass)
        );
    }
}
