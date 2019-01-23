import { XHRBackend } from '@angular/http';
import { LoaderService } from '../core/loader/loader.service';
import { AngularReduxRequestOptions } from '../core/angular-redux-request.options';
import { HttpService } from '../core/http.service';

function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService ) {
    return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };