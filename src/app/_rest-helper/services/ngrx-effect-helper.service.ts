import {Injectable} from "@angular/core";
import {OperatorFunction} from "rxjs/interfaces";
import {GenericActions, GenericActionTypes} from "../actions/generic.action";
import {Action} from "@ngrx/store";
import {ofType} from "@ngrx/effects";
import {NgrxRestDataService} from "./ngrx-rest-data.service";
import {Observable} from "rxjs/Observable";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {pipe} from "rxjs/RX";

@Injectable()
export class NgrxEffectHelper {

    constructor(private ngrxRestDataService: NgrxRestDataService) {
    }

    selectAction<action extends GenericActions>(actionClass: new () => action,
                                                actionType: GenericActionTypes): OperatorFunction<Action, Action> {
        // TODO: add selector for multiple action types
        return ofType(new actionClass().getType(actionType));
    }

    executeRequest<action extends GenericActions, R>(actionClass: new () => action): OperatorFunction<Action, Observable<R>> {
        // TODO: add parameter to specify action Type
        // TODO: implement retry logic
        // TODO: use payload for specific request
        // TODO: user mergemap via options to prevent request abort
        return switchMap((actionObject: Action) => {
            const actionInstance = new actionClass();
            return this.ngrxRestDataService.loadAll(actionInstance.resourcePath);
        });
    }


    handleSuccessResponse<action extends GenericActions>(actionClass: new () => action): OperatorFunction<any, Action> {
        return map((response) => ({type: new actionClass().getAllSuccessType(), payload: response}));
    }

    handleErrorResponse<action extends GenericActions>(actionClass: new () => action): OperatorFunction<Action, Action> {
        return catchError(err => of({type: new actionClass().getAllErrorType(), payload: err}));
    }

    handle<action extends GenericActions>(actionClass: new () => action,
                                          actionType: GenericActionTypes): OperatorFunction<Action, Action> {
        return pipe(
            this.selectAction(actionClass, actionType),
            this.executeRequest(actionClass),
            this.handleSuccessResponse(actionClass),
            this.handleErrorResponse(actionClass)
        );
    }
}
