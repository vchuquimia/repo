import { Animations } from '../../core/animations';
import { Component } from '@angular/core';
//import { FileUploader } from 'ng2-file-upload';
import { BaseRequestOptions, Headers, RequestOptions, RequestOptionsArgs, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../../core/http.service';

@Component({
    moduleId: module.id,
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styles: [':host { width: 100%; display: block; }', `#pgnumber {  
display: none !important;  
}  
.fileUpload {  
position: relative;  
overflow: hidden;  
margin: 10px;  
}  
.fileUpload input.upload {  
position: absolute;  
top: 0;  
right: 0;  
margin: 0;  
padding: 0;  
font-size: 20px;  
cursor: pointer;  
opacity: 0;  
filter: alpha(opacity=0);  
}   `],
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
}
)
export class FileUploadComponent {
    constructor(private http: Http) {
    }
    //file upload event  
    //file upload event  
    fileChange(event) {
        //debugger;
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            let xhr: XMLHttpRequest = this.Foo('/api/home',formData);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        console.log("Success");
                    } else {
                        console.log("Error");
                    }
                }
            }
        }
        }


    // Foo function
     public Foo(url,formData) {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', url, true);

        // enctype For Multipart Request
        xhr.setRequestHeader("enctype", "multipart/form-data");

        // IE bug fixes to clear cache
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Cache-Control", "no-store");
        xhr.setRequestHeader("Pragma", "no-cache");

        xhr.send(formData);
        return xhr;
    }
}  