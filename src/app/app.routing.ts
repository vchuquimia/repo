import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VersionItemComponent } from './modules/version/version-item.component';
import { VersionPlanComponent } from './modules/version/version-plan.component';
import { Routes, RouterModule, RouterStateSnapshot } from '@angular/router';

// import { DashboardComponent } from './dashboard.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';
import { NotFoundComponent } from './shared/pagenotfound.component';
import { DemoControlsComponent } from './modules/demo-controls/demo-controls.component';
import { FileUploadComponent } from './modules/demo-controls/file-upload.component';
import { PendingListComponent } from './modules/pending-list/pending-list.component';
import { PendingListItemComponent } from './modules/pending-list/pending-list-item.component';
import { SearchVersionComponent } from './modules/version/search-version.component';
import { VersionComponent } from './modules/version/version.component';
import { SearchTeamMemberComponent } from './modules/team-member/search-team-member.component';
import { TeamMemberComponent } from './modules/team-member/team-member.component';
import { RejectedItemComponent } from './modules/rejected-item/rejected-item.component';

const appRoutes: Routes = [
  {
    path: 'controls',
    component: DemoControlsComponent
  },
  {
    path: 'fileupload',
    component: FileUploadComponent
  },
  {
    path: 'versionPlan/:VersionId',
    component: VersionPlanComponent
  },
  {
    path: 'pending-list',
    component: PendingListComponent
  },
  {
    path: 'pending-list-item/:PendingListId',
    component: PendingListItemComponent
  },
  {
    path: 'search-version',
    component: SearchVersionComponent
  },
  {
    path: 'version/:VersionId',
    component: VersionComponent
  },
   {
    path: 'versionitem/:VersionId',
    component: VersionItemComponent
  },
  {
    path: 'rejected-item/:VersionItemId',
    component: RejectedItemComponent
  },
  {
    path: 'search-team-member',
    component: SearchTeamMemberComponent
  },
  {
    path: 'team-member/:TeamMemberId',
    component: TeamMemberComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
   {
    path: '**',
    component: NotFoundComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [ NotFoundComponent, DemoControlsComponent, FileUploadComponent];
//DashboardComponent, HeroesComponent, HeroDetailComponent