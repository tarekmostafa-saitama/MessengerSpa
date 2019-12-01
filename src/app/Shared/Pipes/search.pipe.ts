import { Pipe, PipeTransform } from '@angular/core';
import { FriendRelationUnit } from '../Models/friend-relation-unit';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: FriendRelationUnit[], term: string): any {
    if (items===undefined || term === undefined || term.trim() =='') return items;

    return items.filter(function(item) {
      if(item.NickName.toLowerCase().includes(term.toLowerCase()))
      return true;

      return false;
    });
  }
}