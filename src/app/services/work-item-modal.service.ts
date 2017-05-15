import { BehaviorSubject } from 'rxjs/Rx';
import { WorkItemComponent } from '../modules/work-item/work-item.component';
import { WorkItemService } from './work-item.service';
import {
  WorkItem
} from '../models/work-item';
import {
  Injectable,
  TemplateRef
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  NgbModalRef,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";

/**
 * This class provides the WorkItemService service with methods to read names and add names.
 */
@Injectable()
export class WorkItemModalService {
  /**
   * Creates a new WorkItemServiceService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */


  public modalRef: NgbModalRef;
  private content: TemplateRef < any > ;
  //public componentData = null;
  public componentData: BehaviorSubject<any>;

  constructor(public  http: Http, public modalService: NgbModal){//, private wiService: WorkItemService) {

    this.componentData = new BehaviorSubject<any>(null);
  }

  public setContent(content: TemplateRef < any > )
  {
      this.content = content;
  }

  // public openWorkItemById(tfsId: number){
  //     this.wiService.Get(tfsId).subscribe(
  //     wi => {
  //       this.openWorkItem(wi);
  //     });
  // }

  public openWorkItem(wi: WorkItem){
        this.createWorkItemComponent(wi);
  }

  createWorkItemComponent(wi: WorkItem) {
    
     this.componentData.next({
          component: WorkItemComponent,
          inputs: {
            workItem: wi
          }
        });

        this.openModal();
  }

  public openModal() {
    //this.selectedWorItem = workItem;

    this.modalRef = this.modalService.open(this.content);

    this.modalRef.result.then((result) => {}, (reason) => {});
  }

}
