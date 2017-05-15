import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlterManagerService } from './alert-manager.service';

@Injectable()
export class ServiceErrorHandlingService {

    constructor(private alertManager: AlterManagerService) { }

    public handleError (error: any) {
        // log error
        let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`

        this.alertManager.showError('Error', errorMsg);
        console.error(errorMsg);
        // throw an application level error
        return Observable.throw(errorMsg);

    }
}