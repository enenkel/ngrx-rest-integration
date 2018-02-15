import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {getStudentList, IState} from "./reducers";
import {StudentsAction} from "./actions/students.action";
import {StoreHelperService} from "@omm/ngrx-helpers";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public title = "NGRX-REST Integration";
    public students;


    constructor(private store: Store<IState>, private storeHelperService: StoreHelperService) {
        this.students = this.store.pipe(select(getStudentList));
    }

    loadStudents() {
        this.storeHelperService.getAll(StudentsAction);
    }
}
