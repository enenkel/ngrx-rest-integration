import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {DataService} from "../services/data.service";
import {StudentsAction} from "../actions/students.action";
import {NgrxEffectHelper} from "../_rest-helper/services/ngrx-effect-helper.service";

@Injectable()
export class StudentsEffect {

    @Effect()
    students$: Observable<Action> = this.actions$
        .pipe(this.ngrxEffectHelper.handle(StudentsAction, "LoadAll"));

    constructor(private actions$: Actions,
                private dataService: DataService,
                private ngrxEffectHelper: NgrxEffectHelper) {
    }
}
