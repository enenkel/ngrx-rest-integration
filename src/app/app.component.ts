import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {getStudentList, IState} from "./reducers";
import {StudentsAction} from "./actions/students.action";
import {NGRXRestService} from "./_rest-helper/services/ngrx-rest.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public title = "NGRX-REST Integration";
    public students;


    constructor(private store: Store<IState>, private ngrxRestService: NGRXRestService) {
        this.students = this.store.pipe(select(getStudentList));
    }

    loadStudents() {
        this.ngrxRestService.getAll(StudentsAction);
    }
}
