import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAppModule} from './ngmaterial.module';
import {OwnerComponent} from './views/owner/owner.component';
import {ChangeComponent} from './views/change/change.component';

import {InMemOwnerService} from './services/in-memory-data.service';

const appRoutes: Routes = [
  {path: '', component: OwnerComponent},
  {
    path: 'owner',
    children: [{path: ':viewType/:id', component: ChangeComponent}, {path: 'add', component: ChangeComponent}]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    ChangeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemOwnerService),
    MaterialAppModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
