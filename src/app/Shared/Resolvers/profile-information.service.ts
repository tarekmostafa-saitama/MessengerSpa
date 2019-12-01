import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileDetails } from '../Models/profile-details.model';
import { MemberService } from '../Services/member.service';
import { tap, map, filter } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProfileInformationService implements Resolve<ProfileDetails> {

  constructor(private http : HttpClient,private memberService : MemberService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileDetails> | Promise<ProfileDetails> |ProfileDetails {
   setTimeout(()=>{},10000)
    return this.memberService.ProfileDetails().pipe( map((x:ProfileDetails) => {
      return x;
  }));
  }
}
