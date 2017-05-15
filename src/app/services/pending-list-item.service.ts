import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpService } from '../core/http.service';
import { PendingListItem } from '../models/pending-list-item';
import { ISearchService } from '../lib/controls/ISearchService';
import { Observable } from 'rxjs/Rx';
import { ServiceErrorHandlingService } from './service-error-handling.service';

@Injectable()
export class PendingListItemService {

    constructor(
        public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService
    ) { }

    public GetByPendingListId(PendingListId: number): Observable<Array<PendingListItem>>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('PendingListId', PendingListId.toString());

        let pendingListItems = this.http.get('/api/PendingListItem', {search: params})
        .map((r: Response) => r.json()as PendingListItem)
        .catch(this.serviceErrorHandlingService.handleError);

        return pendingListItems;
    }
}