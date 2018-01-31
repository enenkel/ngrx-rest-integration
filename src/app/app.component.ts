import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";

import {getStudentList, IState} from "./reducers";
import {LoadStudents} from "./actions/students.action";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    public title = "NGRX-REST Integration";
    public students;


    constructor(private store: Store<IState>) {
        this.students = this.store.pipe(select(getStudentList));
    }

    loadStudents() {
        this.store.dispatch(new LoadStudents());
    }

}
