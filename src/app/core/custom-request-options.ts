import { BaseRequestOptions, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Url} from '../url';
export class CustomRequestOptions extends BaseRequestOptions {
    merge(options?:RequestOptionsArgs): RequestOptions {
        let url = new Url();
        //options.url = 'http://localhosto:20001' + options.url;
        options.url = url.GetCurrentSiteUrl() + options.url;
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let result = super.merge(options);
        result.merge = this.merge;
        return result;
    }
}