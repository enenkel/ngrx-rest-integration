import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";
import {LoadStudents, LoadStudentsSuccess, StudentsActionTypes} from "../actions/students.action";
import {DataService} from "../services/data.service";

@Injectable()
export class StudentsEffect {

    @Effect()
    students$: Observable<Action> = this.actions$.pipe(
        ofType<LoadStudents>(StudentsActionTypes.LoadAllStudents),
        switchMap(() => this.dataService.loadAllStudents()
            .pipe(map(students => (new LoadStudentsSuccess(students)))))
    );

    constructor(private actions$: Actions, private dataService: DataService) {
    }
}
