import {
  PrimeTemplate
} from '../../lib/controls/shared/prime-template';
import {
  WorkItemModalService
} from '../../services/work-item-modal.service';
import {
  WorkItemService
} from '../../services/work-item.service';
import {
  WorkItemComponent
} from '../../modules/work-item/work-item.component';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';

import {
  Url
} from '../../url';
@Component({
  moduleId: module.id,
  selector: 'aasi-header',
  templateUrl: 'header.component.html',
  styles: ['app-header', 'navbar'],
  //providers:[SessionService]
})
export class HeaderComponent {
  public UserName: string;
  public url = new Url();
  workItemId: number;

  public componentData = null;

  constructor(private wiService: WorkItemService, private wimService: WorkItemModalService) {}

  createWorkItemComponent() {
    this.wiService.Get(this.workItemId).subscribe(r =>
      this.wimService.openWorkItem(r)
    );
  }

  public getLogOutAddress(): string {
    return this.url.GetCurrentSiteUrl() + '/RenderForms/LogOut.aspx?response=' + this.url.appIndex;
  }

  public getUserInfoAddress(): string {
    return this.url.GetCurrentSiteUrl() + '/RenderForms/AccountInfo.aspx?response=' + this.url.appIndex;
  }

  public getAppRootAddress(): string {
    return this.url.GetCurrentSiteUrl() + this.url.appIndex;
  }
}
