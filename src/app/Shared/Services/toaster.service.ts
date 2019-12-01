import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) {}

    Success(title: string, message: string) {
        this.toastr.success(title, message);
    }
    Error(title: string, message: string) {
         this.toastr.error(title, message);
    }
    Info(title: string, message: string) {
         this.toastr.info(title, message, {
          timeOut: 20000,
          positionClass: 'toast-bottom-right'
        });
    }
    Warning(title: string, message: string) {
         this.toastr.warning(title, message);
    }
}
