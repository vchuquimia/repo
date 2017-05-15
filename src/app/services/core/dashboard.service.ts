import { SessionService } from './../session.service';
import { WorkItem } from '../../models/work-item';
import { HttpService } from '../../core/http.service';
import { ServiceErrorHandlingService } from './../service-error-handling.service';
import { Injectable } from '@angular/core';
import {URLSearchParams, Http,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
* This class provides the Dashboard service with methods to read names and add names.
*/
@Injectable()
export class DashboardService {
/** 
* Creates a new DashboardService with the injected Http.
* @param {Http} http - The injected Http.
* @constructor
*/
    constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService
    , private session: SessionService) {}
/**
* Returns an Observable for the HTTP GET request for the JSON resource.
* @return {WorkItem[]} The Observable for the HTTP request.
*/
    public GetWorkInProgress(): Observable<Array<WorkItem>> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('ProjectName', this.session.currentSession.value.project);
        
        return this.http.get('/api/core/dashboard/GetWorkInProgress', {search: params})
        .map((res: Response) => res.json() as WorkItem)
        .catch(this.serviceErrorHandlingService.handleError);
    }
}