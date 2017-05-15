import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpService } from '../core/http.service';
import { RejectedItem } from '../models/rejected-item';
import { ISearchService } from '../lib/controls/ISearchService';
import { Observable } from 'rxjs/Rx';
import { ServiceErrorHandlingService } from './service-error-handling.service';
@Injectable()
export class RejectedItemService {

    constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) { }

    public GetAllRejectedItems(): Observable<Array<RejectedItem>>
    {
        let versions = this.http.get('/api/RejectedItem')
            .map((r: Response) => r.json()as RejectedItem)
            .catch(this.serviceErrorHandlingService.handleError);

        return versions;
    }

    public DeleteRejectedItem(RejectedItemId: number): Observable<Response>
    {
        let result = this.http.delete('/api/RejectedItem/' + RejectedItemId)
        .catch(this.serviceErrorHandlingService.handleError) ;

        return result;
    }

    public SetRejectedItem(ri: RejectedItem): Observable<RejectedItem>
    {
        let result : Observable<RejectedItem>;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let objectToSend = JSON.stringify(ri);
        
        if(ri.Id > 0){
            //UPDATE 
            result = this.http.put('/api/RejectedItem/'+ri.Id, objectToSend, { headers: headers})
            .map((r: Response) => 
            {
                return r.json();
            } )  ;                      
        }
        else{
            //CREATE
            result =this.http.post('/api/RejectedItem', objectToSend, { headers: headers})  
            .map((r: Response) => r.json() );
        }

        return result;
    }

    public GetByVersionItemId(versionItemId: number): Observable<RejectedItem>
    {
        let ri = this.http.get('/api/RejectedItem/'+versionItemId)
            .map((r: Response) => r.json()as RejectedItem)
            .catch(this.serviceErrorHandlingService.handleError);

        return ri;
    }
}