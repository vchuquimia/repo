import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkItemModalService } from './services/work-item-modal.service';
import DynamicWorkItemComponent from './modules/work-item/dynamic-work-item.component';
import { WorkItemComponent } from './modules/work-item/work-item.component';
import { AvatarComponent } from './shared/components/avatar.component';
import { UserAcronymPipe } from './lib/pipes/user-acronym.pipe';
import { DashboardService } from './services/core/dashboard.service';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SessionService } from './services/session.service';
import { Animations } from './core/animations';
import { Parent } from './lib/controls/parent';
import { Child } from './lib/controls/child';
import { DataGrid } from './lib/controls/data-grid';
import { SharedModule } from './lib/controls/shared';
import {VersionPlanComponent} from './modules/version/version-plan.component';
import { VersionItemService } from './services/version-item.service';
import { VersionItemComponent } from './modules/version/version-item.component';
import { VersionPlanService } from './services/version-plan.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import {HttpService} from './core/http.service';

import { ServiceErrorHandlingService } from './services/service-error-handling.service';


import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/sidebar/menu.component';
import { SideBarComponent } from './shared/sidebar/sidebar.component';

import { camelCaseToHumanPipe } from './lib/pipes/camel-case-to-human.pipe';

import { SearchBox, ComboBox } from './lib/controls/index';
import { CustomRequestOptions } from './core/custom-request-options';
import { ChartsModule  } from 'ng2-charts';
//import { SimpleNotificationsModule, PushNotificationsService, NotificationsService } from 'angular2-notifications';
import { MomentModule} from 'angular2-moment';
// import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AlterManagerService } from './services/alert-manager.service';
import {NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {SlimLoadingBarModule, SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {WorkItemService} from './services/work-item.service';

import { PendingListComponent } from './modules/pending-list/pending-list.component';
import { PendingListItemComponent } from './modules/pending-list/pending-list-item.component';
import { PendingListService } from './services/pending-list.service';
import { PendingListItemService } from './services/pending-list-item.service';
import { SearchVersionComponent } from './modules/version/search-version.component';
import { VersionComponent } from './modules/version/version.component';
import { VersionService } from './services/version.service';
import { SearchTeamMemberComponent } from './modules/team-member/search-team-member.component';
import { TeamMemberComponent } from './modules/team-member/team-member.component';
import { TeamMemberService } from './services/core/team-member.service';
import { RejectedItemComponent } from './modules/rejected-item/rejected-item.component';
import { RejectedItemService } from './services/rejected-item.service';
import { SpreadsheetComponent } from './modules/demo-controls/spread-sheet.component';
export function httpServiceFactory(backend: XHRBackend, options: CustomRequestOptions, loadingService: SlimLoadingBarService,
       alertManager: AlterManagerService) {
        return new HttpService(backend, options, loadingService, alertManager);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    ChartsModule,
    SlimLoadingBarModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule,
    //SimpleNotificationsModule.forRoot(),
    MomentModule
    //RoundProgressModule
  ],
  declarations: [
    AppComponent,
    //HeroSearchComponent,
    routedComponents,
    HeaderComponent,
    SideBarComponent,
    MenuComponent,
    PendingListComponent,
    PendingListItemComponent,
    VersionComponent,
    SearchVersionComponent,
    VersionItemComponent,
    VersionPlanComponent,
    TeamMemberComponent,
    SearchTeamMemberComponent,
    RejectedItemComponent,
    DashboardComponent,
    //ChartsModule,
    camelCaseToHumanPipe,
    AvatarComponent,
    UserAcronymPipe,
    SearchBox, ComboBox, DataGrid, Parent, Child, SpreadsheetComponent, WorkItemComponent, DynamicWorkItemComponent
    
  ],
  providers: [
     { provide: RequestOptions, useClass: CustomRequestOptions },
     {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, AlterManagerService]
    },
  WorkItemService,
  VersionPlanService,
    NgbModalRef,
    AlterManagerService,
    PendingListService,
    VersionService,
    ServiceErrorHandlingService,
    PendingListItemService,
    TeamMemberService,
    VersionItemService,
    RejectedItemService,
    Animations,
    SessionService,
    DashboardService,
    //PushNotificationsService,
    //NotificationsService, 
    WorkItemModalService
    // { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    // { provide: SEED_DATA, useClass: InMemoryDataService }     // in-mem server data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 