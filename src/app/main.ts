import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Url} from './url';
import { AppModule } from './app.module';


// function GetBaseUrl() {
//     var appIndex = '/online3';
//     //var appFolder = TrimUrl('/'+appIndex);
//     var stringPathName = window.location.pathname;
//     var index = stringPathName.toLowerCase().indexOf(appIndex);
//     var baseUrl = stringPathName.substring(0, index)+'/online3/src/';
//     console.log('BASE URL', baseUrl); 
//     return baseUrl;
// }


function setBase()
{
  let url = new Url();
  var newBase = document.createElement("base");
      newBase.setAttribute("href", url.GetCurrentBaseUrl());
      document.getElementsByTagName("head")[0].appendChild(newBase);
}

setBase();
 //baseRoot
      

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));

