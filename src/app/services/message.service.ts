import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  private timeout: number = 3000;
  
  constructor(
    private messageService: MessageService
  ) { }

  showSuccessMessage(message: string) {
    this.messageService.add(
        { severity: 'success', summary: 'Success', detail: message,  sticky: true}
      );
      this.clearAllAfterTimeout();
    }

  showErrorMessage(message: string) {
    this.messageService.add(
        { severity: 'error', summary: 'Error', detail: message,  sticky: true}
      );
      this.clearAllAfterTimeout();
    }

  showInfoMessgae(message: string){
    this.messageService.add(
      { severity: 'info', summary: 'Info', detail: message,  sticky: true}
    );
    this.clearAllAfterTimeout();
  }
  
  clearAllAfterTimeout(){
    setTimeout(() => {
      this.messageService.clear();
    }, this.timeout); 
  }

  // TODO :: fix issue (messages dont show when key property provided)
  // so rn each message cant have its own timeout.
  clearAfterTimeout(key: string){
    setTimeout(() => {
      this.messageService.clear(key);
    }, this.timeout); 
  }
}