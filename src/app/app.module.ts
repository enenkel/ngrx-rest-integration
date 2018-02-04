// https://github.com/ngrx/platform/blob/master/example-app/app/app.module.ts

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {NgrxHelpersModule} from "@omm/ngrx-helpers/src/index";

import {environment} from "../environments/environment";
import {AppComponent} from "./app.component";
import {metaReducers, reducers} from "./reducers";
import {DataService} from "./services/data.service";
import {StudentsEffect} from "./effects/students.effect";


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
        EffectsModule.forRoot([StudentsEffect]),
        NgrxHelpersModule.forRoot()
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
