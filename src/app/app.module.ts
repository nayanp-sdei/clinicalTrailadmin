import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderInterceptors } from './Interceptors/header-interceptors.service';
import { ResponseInterceptors } from './Interceptors/response-interceptors.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule, 
        AppRoutingModule, 
        HttpClientModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            maxOpened: 1
          }),
        TabsModule.forRoot(),
        CKEditorModule,
        BsDatepickerModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptors, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptors, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
