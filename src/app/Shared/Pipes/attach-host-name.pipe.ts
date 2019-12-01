import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'attachHostName'
})
export class AttachHostNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return environment.apiBaseUrl + value;
  }

}
