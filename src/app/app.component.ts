import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DsDocumentProcessingModule } from './ds-document-processing/ds-document-processing.module';

declare const TXTextControl: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public _http: HttpClient;

  private _mergeData: any;
  private _dsDocumentProcessing: DsDocumentProcessingModule;

  title = 'my-ds-editor-app';

  constructor(http: HttpClient) {
    this._http = http;   
    this._dsDocumentProcessing = new DsDocumentProcessingModule(this._http);

    // dummy merge data
    this._mergeData = [{
      customer: [
        {
          name: "Peter Petersen",
          company: "Software House",
        },
        {
          name: "Jack Developer",
          company: "Software Company",
        }
      ],
    }];
  }

  @HostListener('document:dsDocumentEditorLoaded')
  onDsDocumentEditorLoaded() {
    // attached textControlLoaded event
    TXTextControl.addEventListener("textControlLoaded", () => {
      // fill reporting drop-down structure with dummy merge data
      this._dsDocumentProcessing.loadData(this._mergeData);
    });		
  }

  async onClickMergeDocument() {
    // get the saved document from TXTextControl
    let mergeBody: MergeBody = {
      mergeData: this._mergeData,
      template: await this._dsDocumentProcessing.saveDocument(),
      mergeSettings: null
    };

    this._dsDocumentProcessing.mergeDocument(mergeBody, 'TX');
  };
}

class MergeBody {
  mergeData: any;
  template: any;
  mergeSettings: string;
}

