import {
  Observable
} from 'rxjs/Rx';
import {
  Animations
} from '../../core/animations';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
// import {
//   deserialize
// } from 'json-typescript-mapper';
// import {
//   TypedJSON
// } from '../../lib/typed-json';
import {
  SlimLoadingBarService
} from 'ng2-slim-loading-bar';
import {
  AlterManagerService
} from '../../services/alert-manager.service';
import {
  AlertType
} from '../../core/alert';
import {
  NotificationsService,
  PushNotificationsService
} from 'angular2-notifications';
import { Subscription } from "rxjs/Subscription";
@Component({
  moduleId: module.id,
  selector: 'demo-controls',
  templateUrl: 'demo-controls.component.html',
  styles: [':host { width: 100%; display: block; }'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: Animations.page
  //providers: [SessionService]
})
export class DemoControlsComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(
    public loadingService: SlimLoadingBarService,
    private alertService: AlterManagerService, private service: NotificationsService, private pushService: PushNotificationsService) {}
  ItemsSource: any[];
  ticks = 0;
  timer: Subscription;

  ngOnInit(): void {
    var timer = Observable.timer(2000, 60000);
    this.timer = timer.subscribe(t => this.tickerFunc(t));
  }
  ngOnDestroy(): void {
    this.timer.unsubscribe();
  }
  tickerFunc(tick) {
    console.log(new Date());
    this.ticks = tick
  }

  public current = 40;
  public max = 100;



  public ngAfterViewInit() {

    this.ItemsSource = [{
        brand: 'Apple',
        lastYearSale: '51%',
        thisYearSale: '40%',
        lastYearProfit: '$54,406.00',
        thisYearProfit: '$43,342'
      },
      {
        brand: 'Samsung',
        lastYearSale: '83%',
        thisYearSale: '96%',
        lastYearProfit: '$423,132',
        thisYearProfit: '$312,122'
      },
      {
        brand: 'Microsoft',
        lastYearSale: '38%',
        thisYearSale: '5%',
        lastYearProfit: '$12,321',
        thisYearProfit: '$8,500'
      },
      {
        brand: 'Philips',
        lastYearSale: '49%',
        thisYearSale: '22%',
        lastYearProfit: '$745,232',
        thisYearProfit: '$650,323,'
      },
      {
        brand: 'Song',
        lastYearSale: '17%',
        thisYearSale: '79%',
        lastYearProfit: '$643,242',
        thisYearProfit: '500,332'
      },
      {
        brand: 'LG',
        lastYearSale: '52%',
        thisYearSale: ' 65%',
        lastYearProfit: '$421,132',
        thisYearProfit: '$150,005'
      },
      {
        brand: 'Sharp',
        lastYearSale: '82%',
        thisYearSale: '12%',
        lastYearProfit: '$131,211',
        thisYearProfit: '$100,214'
      },
      {
        brand: 'Panasonic',
        lastYearSale: '44%',
        thisYearSale: '45%',
        lastYearProfit: '$66,442',
        thisYearProfit: '$53,322'
      },
      {
        brand: 'HTC',
        lastYearSale: '90%',
        thisYearSale: '56%',
        lastYearProfit: '$765,442',
        thisYearProfit: '$296,232'
      },
      {
        brand: 'Toshiba',
        lastYearSale: '75%',
        thisYearSale: '54%',
        lastYearProfit: '$21,212',
        thisYearProfit: '$12,533'
      }
    ];
  }


  public getAccountingEntities() {}


  public onOfferingCleared() {

    console.log('cleared !');
  }

  public start() {

    this.service.alert('alert', 'run !');
  }

  public start2() {

    //this.pushService.requestPermission();
    this.pushService.create('alert');
  }

  public inputJson: string;
  public testObj: any;

  public arrayOfKeyValues2: any[] = [{
    Key: 1,
    Name: 'Key One'
  }, {
    Key: 2,
    Name: 'Key Two'
  }, {
    Key: 3,
    Name: 'Key Three'
  }, {
    Key: 4,
    Name: 'Key Four'
  }];


  startLoading() {
    this.loadingService.start(() => {
      console.log('Loading complete');
    });
  }

  stopLoading() {
    this.loadingService.stop();
  }

  completeLoading() {
    this.loadingService.complete();
  }

  staticAlertClosed = false;

  showError() {
    this.alertService.showError('alert', 'lorem ipsum');
  }

  showInfo() {
    this.alertService.showInfo('alert', 'lorem ipsum');
  }

  showWarning() {
    this.alertService.showWarning('alert', 'lorem ipsum');
  }

  showSuccess() {
    this.alertService.showSuccess('alert', 'lorem ipsum');
  }


  public lineChartData: Array < any > = [{
    data: []
  }]
  public series: Array < any > = []

  public lineChartData2: Array < any > = [{
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B'
    },
    {
      data: [18, 48, 77, 9, 100, 27, 40],
      label: 'Series C'
    }
  ];
  public lineChartLabels: Array < any > = ['jan', 'February', 'March', 'April', 'May', 'June', 'July'];

}
