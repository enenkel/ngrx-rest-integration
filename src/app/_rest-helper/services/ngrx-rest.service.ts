import {Injectable} from "@angular/core";
import {GenericActions, GenericActionTypes} from "../actions/generic.action";
import {Action, Store} from "@ngrx/store";
import {IState} from "../../reducers";
import {NgrxRestDataService} from "./ngrx-rest-data.service";

@Injectable()
export class NGRXRestService {

    constructor(private store: Store<IState>, private ngrxRestDataService: NgrxRestDataService) {
    }

    getAll<action extends GenericActions>(actionClass: new () => action) {
        const actionInstance = this.createActionInstance(actionClass, "LoadAll");
        this.store.dispatch(actionInstance);
    }

    private createActionInstance<action extends GenericActions>(actionClass: new () => action,
                                                                actionType: GenericActionTypes,
                                                                onlyType: boolean = false): Action {
        const instance: action = new actionClass();
        let action: Action;
        const type = instance.getType(actionType);

        if (onlyType) {
            return {type};
        }

        switch (actionType) {
            case "LoadAll":
                action = {type};
                break;
            default:
                throw new Error("Not a supported actiontype");
        }
        return action;
    }

    /**
     * Get's the actions type string
     * @param {{new(): action}} actionClass
     * @param {GenericActionTypes} actionType
     * @return {string}
     */
    getType<action extends GenericActions>(actionClass: new () => action,
                                           actionType: GenericActionTypes): string {
        return new actionClass().getType(actionType);
    }
}
