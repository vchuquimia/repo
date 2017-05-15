import {Observable} from 'rxjs/Rx';

export interface ISearchService<Any,Parameter> {
   search(filter:string, param: Parameter): Observable<Array<Any>>;
}
