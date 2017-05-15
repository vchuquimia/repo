import { ServiceErrorHandlingService } from './service-error-handling.service';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { VersionItem } from '../models/version-item';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../core/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VersionItemService {

    constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) {

    }

    public GetByVersionItem(VersionItemId: number): Observable<VersionItem>
    {
        let params: URLSearchParams = new URLSearchParams();
        params.set('VersionItemId', VersionItemId.toString());

        let version = this.http.get('/api/versions/versionitem/get', {search:params})
        .map((r: Response) => r.json()as VersionItem)
        .catch(this.serviceErrorHandlingService.handleError);

        return version;
    }

    public GetByVersion(versionId: number): Observable<Array<VersionItem>> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('versionId', versionId.toString());
        var res = this.http.get('/api/versions/versionitem/GetByVersion', {search:params})
        .map((r: Response) => r.json()as VersionItem)
        .catch(this.serviceErrorHandlingService.handleError);
        return res;
    }

    public DeleteVersionItem(VersionItemId: number): Observable<Response> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('Id', VersionItemId.toString());
        let result = this.http.delete('/api/versions/versionitem', {search:params})
            .catch(this.serviceErrorHandlingService.handleError);

        return result;
    }

    public IncludeItemsInVersion(versionId: number, ids: Array<number>): Observable<string> {
        let result: Observable<string>;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let objectToSend = JSON.stringify({ versionId: versionId, ids: ids.join() });

        //CREATE
        result = this.http.post('/api/versions/VersionItem', objectToSend, { headers: headers })
            .map((r: Response) => r.json());
        return result;
    }
}