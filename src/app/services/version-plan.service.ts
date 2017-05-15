import {
  Headers,
  Http,
  Response,
  URLSearchParams
} from '@angular/http';
import {
  HttpService
} from '../core/http.service';
import {
  httpFactory
} from '@angular/http/src/http_module';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Rx';
import {
  ServiceErrorHandlingService
} from './service-error-handling.service';
import {
  ISearchService
} from '../lib/controls/ISearchService';
import {
  WorkItem
} from '../models/work-item';

@Injectable()
export class VersionPlanService {
  constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) {}

  public CreateVersionPlan(versionId: number, itemsOnVersion: number): Observable < string > {
    let result: Observable < string > ;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let objectToSend = JSON.stringify({
      versionId: versionId,
      itemsOnVersion: itemsOnVersion
    });

    //CREATE
    result = this.http.post('/api/VersionPlan/', objectToSend, {
      headers: headers
    })
    .map((r: Response) => r.json());
    return result;
  }

  public GetVersionPlanItems(projectName:string ,  iteration: string): Observable < Array < WorkItem >> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('projectName', projectName);
    params.set('iteration', iteration);
    let funcs = this.http.get('/api/versionplan/GetVersionItems', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItem > )
      .catch(this.serviceErrorHandlingService.handleError);
    return funcs;
  }
}
