import {Injectable} from "@angular/core";
import {GenericAction} from "../actions/generic.action";
import {Store} from "@ngrx/store";
import {IState} from "../../reducers";
import {NgrxRestUtils} from "../utils/ngrx-rest-utils";

@Injectable()
export class NGRXRestService {

    constructor(private store: Store<IState>) {
    }

    getAll<action extends GenericAction>(actionClass: new () => action): void {
        const actionInstance = NgrxRestUtils.createActionInstance(actionClass, "LoadAll");
        this.store.dispatch(actionInstance);
    }

    getOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxRestUtils.createActionInstance(actionClass, "LoadOne", payload);
        this.store.dispatch(actionInstance);
    }

    updateOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxRestUtils.createActionInstance(actionClass, "UpdateOne", payload);
        this.store.dispatch(actionInstance);
    }

    deleteOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxRestUtils.createActionInstance(actionClass, "DeleteOne", payload);
        this.store.dispatch(actionInstance);
    }

    createOne<action extends GenericAction, P>(actionClass: new() => action, payload: P): void {
        const actionInstance = NgrxRestUtils.createActionInstance(actionClass, "CreateOne", payload);
        this.store.dispatch(actionInstance);
    }

}
