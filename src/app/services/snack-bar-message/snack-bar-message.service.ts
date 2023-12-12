import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class SnackBarMessageService {
  private snackBarMessageSubject: Subject<string> = new Subject<string>();

  getSnackBarMessageSubject(): Subject<string> {
    return this.snackBarMessageSubject;
  }

  showMessage(message: string) {
    this.snackBarMessageSubject.next(message);
  }
}