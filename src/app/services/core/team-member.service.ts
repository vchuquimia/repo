import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { HttpService } from '../../core/http.service';
import { TeamMember } from '../../models/team-member';
import { ISearchService } from '../../lib/controls/ISearchService';
import { Observable } from 'rxjs/Rx';
import { ServiceErrorHandlingService } from './../service-error-handling.service';

@Injectable()
export class TeamMemberService {

    constructor(public http: HttpService, public serviceErrorHandlingService: ServiceErrorHandlingService) { }

    public GetAllTeamMembers(): Observable<Array<TeamMember>>
    {
        let tmValues = this.http.get('/api/Core/TeamMember/GetAll')
            .map((r: Response) => r.json()as TeamMember)
            .catch(this.serviceErrorHandlingService.handleError);

        return tmValues;
    }

    public DeleteTeamMember(TeamMemberId: number): Observable<Response>
    {
        let result = this.http.delete('/api/Core/TeamMember/' + TeamMemberId)
        .catch(this.serviceErrorHandlingService.handleError) ;

        return result;
    }

    public SetTeamMember(team: TeamMember): Observable<TeamMember>
    {
        let result : Observable<TeamMember>;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let objectToSend = JSON.stringify(team);
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', team.Id.toString());
        
        if(team.Id > 0){
            //UPDATE 
            result = this.http.put('/api/Core/TeamMember', objectToSend, { search:params, headers: headers})
            .map((r: Response) => 
            {
                return r.json();
            } )  ;                      
        }
        else{
            //CREATE
            result =this.http.post('/api/Core/TeamMember', objectToSend, { headers: headers})  
            .map((r: Response) => r.json() );
        }

        return result;
    }

    public GetTeamMemberById(TeamMemberId: number): Observable<TeamMember>
    {
            let params: URLSearchParams = new URLSearchParams();
        params.set('id', TeamMemberId.toString());
        let tmValue = this.http.get('/api/Core/TeamMember', {search:params})
            .map((r: Response) => r.json()as TeamMember)
            .catch(this.serviceErrorHandlingService.handleError);

        return tmValue;
    }
}