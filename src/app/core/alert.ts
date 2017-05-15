export class Alert {
    id: number;
    title: string;
    type: AlertType;
    message: string;

     get AlertType():string {
        return AlertType[this.type];
    }     

    constructor(id: number, title: string, message: string, type: AlertType) {
        this.id = id;
        this.title = title ? title : '';
        this.message = message;
        this.type = type;
    }
}

export enum AlertType {
    success,
    info,
    warning,
    danger
}