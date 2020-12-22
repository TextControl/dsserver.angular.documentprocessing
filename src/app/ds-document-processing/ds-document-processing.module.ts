import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const TXTextControl: any;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class DsDocumentProcessingModule {

  private _http: HttpClient;
  private _baseUrl: string = 'https://trial.dsserver.io';
  private _clientId: string = 'clientid';
  private _clientSecret: string = 'clientsecret';
  private _urlMerge: string = '/documentprocessing/document/merge';
  private _urlOAuth: string = '/oauth';

  constructor(http: HttpClient) {
    this._http = http;   
  }

  private getAccessToken() {

    return new Promise(resolve => {

      let options = {
        headers: new HttpHeaders({
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization': 'Basic ' + btoa(this._clientId + ':' + this._clientSecret)
        })
      };
  
      this._http.post<any>(this._baseUrl + this._urlOAuth + "/token",
        'grant_type=client_credentials', 
        options).subscribe(result => {
          resolve(result.access_token);
      }, error => console.error(error));

    });

  }

  async mergeDocument(mergeBody, returnFormat) {

    var accessToken = await this.getAccessToken();

    console.log(accessToken);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      })
    };

    this._http.post<any>(this._baseUrl + this._urlMerge + '?returnFormat=' + returnFormat,
      mergeBody,
      options).subscribe(result => {

        // load the results into TXTextControl
        this.loadDocument(result[0]);
  
    }, error => console.error(error));
    
  }

  saveDocument() {
    return new Promise(resolve => {
      TXTextControl.saveDocument(TXTextControl.streamType.InternalUnicodeFormat, function (e) {
        resolve(e.data);
      });
    });
  }

  loadDocument(document) {
    TXTextControl.loadDocument(TXTextControl.streamType.InternalUnicodeFormat, document);
  }

  loadData(data) {
    TXTextControl.loadJsonData(JSON.stringify(data));
  }

}
  
