import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HttpService } from './http.service';
import { httpServiceFactory } from '../_factory/http-service.factory';
import { XHRBackend, RequestOptions, Http } from '@angular/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  providers: [
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }, {
      provide: Http
    }
  ]
})
export class CoreModule { }
