import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.css']
})
export class Page500Component implements OnInit {

  constructor(private route: ActivatedRoute, private translate: TranslateService, private router: Router) { }
  Message: string;
  ngOnInit() {
    const err  = this.route.snapshot.queryParams['e'];
    if (err == null) { this.router.navigate(['home']); } else {
     this.translate.get(err).subscribe(res => {
       if (err == res) { this.router.navigate(['home']); } else {
       this.Message = res;
       }
     });

    }

  }

}
