import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { DataStorageService } from '../Services/data-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Injectable()
export class HttpTrafficInterceptor implements HttpInterceptor {

    constructor(private Storage: DataStorageService, private spinner: NgxSpinnerService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.Storage.getToken()
            }
        });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                this.spinner.hide();
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.spinner.hide();
                switch (err.status) {
                    case 401: {

                    }
                    case 400: {

                    }
                    case 500 : {

                    }

                    default : {

                    }

                }
            }
        }));
    }
}
