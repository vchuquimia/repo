import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AlterManagerService } from '../services/alert-manager.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Injectable()
export class HttpService extends Http {

public apiEndPoint:string = '';
  constructor(backend: XHRBackend, options: RequestOptions, public loadingService: SlimLoadingBarService,
    private alertManager: AlterManagerService) {
    super(backend, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.serviceStarts();
    return super.get(this.apiEndPoint + url, options).map(r => {
      this.serviceCompleted();
      return r;
    }).catch(this.catchAuthError(this));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.serviceStarts();
    return super.post(url, body, options).map(r => {
     this.serviceCompleted();
      return r;
    }).catch(this.catchAuthError(this));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.serviceStarts();
    return super.put(url, body, options).map(r => {
     this.serviceCompleted();
      return r;
    }).catch(this.catchAuthError(this));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
   this.serviceStarts();
    return super.delete(url, options).map(r => {
      this.serviceCompleted();
      return r;
    }).catch(this.catchAuthError(this));
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.serviceStarts();
    return super.request(url, options).map(r => {
      this.serviceCompleted();
      return r;
    }).catch(this.catchAuthError(this));
  }

  private serviceStarts() {
    console.log('->');
    this.loadingService.start();
  }
  private serviceCompleted() {
    console.log('<-');
    this.loadingService.complete();
  }

  private catchAuthError(self: HttpService) {

    return (res: Response) => {
      this.loadingService.stop();
      this.alertManager.showError('Error', res.text());
      console.log('Error !!', res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}