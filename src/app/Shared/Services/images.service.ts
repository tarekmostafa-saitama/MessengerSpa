import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SenderType } from '../Models/Enums/sender-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }
  UploadMessageImage(Image: File, RelationId: string, Sender: SenderType) {
    const urlendpoint = environment.apiBaseUrl + 'api/Image/UploadMemberImage';
    const formdata: FormData = new FormData();
console.log(Sender.toString());
    formdata.append('Image', Image);
    formdata.append('RelationId', RelationId);
    formdata.append('Sender', Sender.toString());

    return this.http.post(urlendpoint, formdata);
  }
  UploadAnonymousImage(Image: File) {
    const urlendpoint = environment.apiBaseUrl + 'api/Image/UploadAnonymousImage';
    const formdata: FormData = new FormData();

    formdata.append('Image', Image);

    return this.http.post(urlendpoint, formdata);
  }
}
