import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error is: ', error);
        console.log('Error status is: ', error.status);
        console.log('Error message is: ', error.error.message);

        if (error.status === 500 && error.error.message === 'Failed to authenticate token') {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          localStorage.removeItem('role');
          this.router.navigate(['/ingreso']);
        }
        return throwError(error);
      })
    );
  }
}
