import { WorkItem } from '../../models/work-item';
import { Component } from '@angular/core';

@Component({
    selector: 'version-summary',
    template: `
      <div class="col-lg-4 text-xs-center bg-pbi">
        New Features:
        <br> <b><h4> {{newFeatures}}</h4> </b>
      </div>
      <div class="col-lg-4 text-xs-center bg-bug">
        Bug Fixes:
        <br>
        <b> <h4>
         {{bugFixes}}
         </h4> 
          </b>
      </div>
      <div class="col-lg-4 text-xs-center bg-hotfix">
        Hot Fixes:
        <br>
        <b> <h4>{{hotFixes}}</h4> </b>
      </div>
      <div class="row">
        <div class="col-lg-12 text-xs-center">
          Total:
          <br>
          <b><h4> {{items?.length}}</h4> </b>
        </div>
      </div>`,
})
export class VersionSummaryComponent  {
    
    
  public isPBI(wi: WorkItem): boolean {
    return wi.Type === 'Product Backlog Item';
  }

  public isBug(wi: WorkItem): boolean {
    return wi.DeployType === 'Version Update';
  }

  public isHotFix(wi: WorkItem): boolean {
    return wi.DeployType === 'Hot Fix';
  }
}