
import { throwError as observableThrowError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import {
    Http,
    RequestOptionsArgs,
    Response,
    Headers,
    XHRBackend
} from '@angular/http';

import { LoaderService } from './loader/loader.service';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AngularReduxRequestOptions } from './angular-redux-request.options';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class HttpService extends Http {
    constructor(
        backend: XHRBackend,
        defaultOptions: AngularReduxRequestOptions,
        private loaderService: LoaderService
    ) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        // console.log(this.baseUrl);
        
        this.showLoader();

        return super.get(url, this.requestOptions(options))
            .pipe(
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => this.onEnd())
            );
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();

        return super.post(url, body, this.requestOptions(options))
            .pipe(
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => this.onEnd())
            )
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();

        return super.put(url, body, this.requestOptions(options))
            .pipe(
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => this.onEnd())
            )
    }

    delete(url: string, body: any): Observable<any>{
        this.showLoader();

        return super.delete(url, body)
            .pipe(
                catchError(this.onCatch),
                tap((res: Response) => {
                    this.onSuccess(res);
                }, (error: any) => {
                    this.onError(error);
                }),
                finalize(() => this.onEnd())
            )
    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new AngularReduxRequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    // private getFullUrl(url: string): string {
    //     return this.apiUrl + url;
    // }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return observableThrowError(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        setTimeout(() => {
            this.loaderService.hide();
        }, 500);
    }
}
