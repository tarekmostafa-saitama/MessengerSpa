import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'friendName'
})
export class FriendNamePipe implements PipeTransform {

  constructor(private translate : TranslateService) {
  }
    transform(value: any, args?: any): any {
      if(value == 'Stranger Friend')
        return this.translate.instant('strangerFriend');
      return value;
    }
}
