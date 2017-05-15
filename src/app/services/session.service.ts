import { Session } from '../models/session';
import { BehaviorSubject } from 'rxjs/Rx';
export class SessionService
{
    /**
     *
     */
    constructor() {
        this.currentSession = new BehaviorSubject<Session>(null);
        let session = new Session();
        session.project= 'AASI.net';
        this.currentSession.next(session);
    }
    public currentSession: BehaviorSubject<Session>;
    

}