import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpService } from '../core/http.service';
import { PendingList } from '../models/pending-list';
import { ISearchService } from '../lib/controls/ISearchService';
import { Observable } from 'rxjs/Rx';
import { ServiceErrorHandlingService } from './service-error-handling.service';

@Injectable()
export class PendingListService {

    constructor(
        public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService
    ) { }

    public GetPendingLists(): Observable<Array<PendingList>>
    {
        let pendingLists = this.http.get('/api/PendingList')
            .map((r: Response) => r.json()as PendingList)
            .catch(this.serviceErrorHandlingService.handleError);

        return pendingLists;
    }
}