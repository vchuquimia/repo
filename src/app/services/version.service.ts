import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpService } from '../core/http.service';
import { Version } from '../models/version';
import { ISearchService } from '../lib/controls/ISearchService';
import { Observable } from 'rxjs/Rx';
import { ServiceErrorHandlingService } from './service-error-handling.service';

@Injectable()
export class VersionService {

    constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) { }

    public GetAllVersions(): Observable<Array<Version>> {
        let versions = this.http.get('/api/versions/Version/getall')
            .map((r: Response) => r.json() as Version)
            .catch(this.serviceErrorHandlingService.handleError);

        return versions;
    }

    public DeleteVersion(VersionId: number): Observable<Response> {
        let result = this.http.delete('/api/versions/Version/' + VersionId)
            .catch(this.serviceErrorHandlingService.handleError);

        return result;
    }

    public SetVersion(version: Version): Observable<Version> {
        let result: Observable<Version>;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let objectToSend = JSON.stringify(version);

        let params: URLSearchParams = new URLSearchParams();
        params.set('id', version.Id.toString());

        if (version.Id > 0) {
            //UPDATE 
            result = this.http.put('/api/versions/Version', objectToSend, {search:params, headers: headers })
                .map((r: Response) => {
                    return r.json();
                });
        }
        else {
            //CREATE
            result = this.http.post('/api/version/Version', objectToSend, { headers: headers })
                .map((r: Response) => r.json());
        }

        return result;
    }

    public GetVersionById(versionId: number): Observable<Version> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', versionId.toString());
        let version = this.http.get('/api/versions/Version/get', {search: params})
            .map((r: Response) => r.json() as Version)
            .catch(this.serviceErrorHandlingService.handleError);

        return version;
    }

    public CreateVersionPlan(versionId: number, itemsOnVersion: number): Observable<string> {
        let result: Observable<string>;
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let objectToSend = JSON.stringify({ versionId: versionId, itemsOnVersion: itemsOnVersion });

        //CREATE
        result = this.http.post('/api/versions/VersionPlan', objectToSend, { headers: headers })
            .map((r: Response) => r.json());
        return result;
    }

    public CloseVersion(versionId: number, itemsToBeClosed: number): Observable<string> {
        let result: Observable<string>;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let objectToSend = JSON.stringify({ versionId: versionId, itemsToBeClosed: itemsToBeClosed });

        //CREATE
        result = this.http.post('/api/versions/version/CloseVersion', objectToSend, { headers: headers })
            .map((r: Response) => r.json());
        return result;
    }
}