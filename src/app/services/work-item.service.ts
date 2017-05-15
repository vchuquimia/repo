import {
  WorkItemLink
} from '../models/work-item-link';
import {
  WorkItemHierarchy
} from '../models/work-item-hierarchy';
import {
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
export class WorkItemService {
  private apiEndPoint: string = '/api/versions/VersionWorkItem/';

  constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) {
     // http.apiEndPoint = '/api/VersionWorkItem/';
  }

  public GetVersionWorkItems(versionId: number): Observable < Array < WorkItem >> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('versionId', versionId.toString());
    let funcs = this.http.get(this.apiEndPoint+'Get', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItem > )
      .catch(this.serviceErrorHandlingService.handleError);
    return funcs;
  }

  public Get(tfsId: number): Observable < WorkItem > {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', tfsId.toString());
    let wi = this.http.get('/api/Controllers/WorkItem/GetById', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItem > )
      .catch(this.serviceErrorHandlingService.handleError);
    return wi;
  }

  public GetByExternalReference(filter: string): Observable < Array < WorkItem >> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('externalReferenceFilter', filter);
    let funcs = this.http.get('/api/Controllers/WorkItem/Get', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItem > )
      .catch(this.serviceErrorHandlingService.handleError);
    return funcs;
  }

  public getHirarchicalWorkItems(versionId: number, includeFinishedItems: boolean, regions: string): Observable < Array < WorkItemHierarchy >> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('versionId', versionId.toString());
    params.set('includeFinishedItems', String(includeFinishedItems));
    params.set('regions', regions);
    let workItems = this.http.get('/api/Versions/VersionWorkItem/GetHierarchy', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItemHierarchy > )
      .catch(this.serviceErrorHandlingService.handleError);
    return workItems;
  }

  public getWorkItemLinksById(workItemId: number): Observable < Array < WorkItemLink >> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', workItemId.toString());
    let workItems = this.http.get('/api/controllers/WorkItem/getWorkItemLinksById', {
        search: params
      })
      .map((r: Response) => r.json() as Array < WorkItemLink > )
      .catch(this.serviceErrorHandlingService.handleError);
    return workItems;
  }


  public ChangeAssigment(wi: WorkItem): Observable < void > {
    let result: Observable < void > ;
    let objectToSend = JSON.stringify(wi);
    result = this.http.put('/api/Versions/VersionItem/ChangeAssigment', objectToSend)
    .map((r: Response) => {
      return r.json();
    });

    return result;
  }
}
