import { Injectable } from '@angular/core';
import { Alert, AlertType } from '../core/alert';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { List } from '../lib/linq';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class AlterManagerService {
    //public alerts: BehaviorSubject<Array<Alert>>;
    public alerts: Array<Alert>;
    constructor(public loadingService: SlimLoadingBarService) {
        //this.alerts = new BehaviorSubject<Array<Alert>>(null);
        this.alerts = new Array<Alert>();
    }

    public showError(title: string, message: string) {
        this.addAlert(title, message, AlertType.danger);
    }

    public showInfo(title: string, message: string) {
        this.addAlert(title, message, AlertType.info);
    }

    public showWarning(title: string, message: string) {
        this.addAlert(title, message, AlertType.warning);
    }

    public showSuccess(title: string, message: string) {
        this.addAlert(title, message, AlertType.success);
    }


    public addAlert(title: string, message: string, type: AlertType) {
        let lastAlertId = new List<Alert>(this.alerts).Select(i => i.id).Max();

        if (lastAlertId === undefined) {
            lastAlertId = 0;
        }
        else {
            lastAlertId++;
        }

        this.alerts.push(new Alert(lastAlertId, title, message, type));
        //this.alerts.next(new Alert(title, message, type))
    }

    public closeAlert(alert: Alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
        if (new List<Alert>(this.alerts).Count() === 0) {
            this.loadingService.complete();
        }
    }
}
