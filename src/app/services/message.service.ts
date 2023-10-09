import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  private messageTimeout: number = 3000;
  constructor(
    private messageService: MessageService
  ) { }

  showSuccessMessage(message: string) {
    this.messageService.add(
        { severity: 'success', summary: 'Success', detail: message, life: this.messageTimeout}
      );
    }

  showErrorMessage(message: string) {
    this.messageService.add(
        { severity: 'error', summary: 'Error', detail: message, life: this.messageTimeout}
      );
    }

  showInfoMessgae(message: string){
    this.messageService.add(
      { severity: 'info', summary: 'Info', detail: message, life: this.messageTimeout}
    );
  }
  
}