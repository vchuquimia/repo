import { WorkItemModalService } from './services/work-item-modal.service';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import {
  AlterManagerService
} from './services/alert-manager.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('content') content: TemplateRef < any > ;
  public componentData = null;
  title = 'online 2 app component';

  constructor(public alertService: AlterManagerService, public wimService: WorkItemModalService) {

  }

     ngAfterViewInit(): void {
        this.wimService.setContent(this.content);
    }
}
