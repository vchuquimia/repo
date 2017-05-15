export class Url{
    public appIndex:string = '/dashboard/src/';
    public GetCurrentBaseUrl() {
        let baseUrl = this.GetCurrentSiteUrl() +this.appIndex;
           // console.log('GetCurrentBaseUrl', baseUrl);
        return baseUrl;
    }

    public GetCurrentSiteUrl() {
        var challenge = '/dashboard';
        //var appFolder = TrimUrl('/'+appIndex);
        var stringPathName = window.location.pathname;
        var index = stringPathName.toLowerCase().indexOf(challenge);
        var siteUrl = stringPathName.substring(0, index);

        ///console.log('GetCurrentSiteUrl', window.location.pathname +' | '+ siteUrl);
        return siteUrl;
    }
}