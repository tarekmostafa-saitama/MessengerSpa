import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject  } from 'rxjs';


import {first} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckFriendExistenceGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const subject = new Subject<boolean>();
      this.http.get(environment.apiBaseUrl + 'api/Member/CheckUserExist?name=' + next.params['id']).subscribe((data: boolean) => {
        if (data) { subject.next(data); } else { this.router.navigate(['error'], {queryParams : { e : 'nf' } }); }
      }, (data) => {
        subject.next(false);
      });
      return subject.asObservable().pipe(first());
  }
}
