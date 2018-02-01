// https://github.com/ngrx/platform/blob/master/example-app/app/app.module.ts

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {environment} from "../environments/environment";

import {AppComponent} from "./app.component";
import {metaReducers, reducers} from "./reducers";
import {DataService} from "./services/data.service";
import {StudentsEffect} from "./effects/students.effect";
import {NGRXRestService} from "./_rest-helper/services/ngrx-rest.service";
import {NgrxRestDataService} from "./_rest-helper/services/ngrx-rest-data.service";
import {NgrxEffectHelper} from "./_rest-helper/services/ngrx-effect-helper.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({
            name: "ngrx-rest-integration-devtools",
            logOnly: environment.production
        }),
        EffectsModule.forRoot([StudentsEffect])
    ],
    providers: [DataService, NGRXRestService, NgrxRestDataService, NgrxEffectHelper],
    bootstrap: [AppComponent]
})
export class AppModule {
}
