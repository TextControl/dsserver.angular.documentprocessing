import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentEditorModule } from '@txtextcontrol/tx-ng-ds-document-editor';

import { DsDocumentProcessingModule } from './ds-document-processing/ds-document-processing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentEditorModule,
    DsDocumentProcessingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
