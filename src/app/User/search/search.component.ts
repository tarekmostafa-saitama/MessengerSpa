import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/Shared/Services/member.service';
import { SearchMember } from 'src/app/Shared/Models/search-member.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  Members: SearchMember[];
  Keyword: string;
  constructor(private memberService: MemberService) { }

  ngOnInit() {
  }
  Search() {
    this.memberService.SearchUsers(this.Keyword).subscribe((Data: SearchMember[]) => {
      this.Members = Data;
    });
  }
}
