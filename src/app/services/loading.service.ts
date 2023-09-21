import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;

  constructor() { }

  startLoading(){
    this.loading = true;
  }

  stopLoading(){
    this.loading = false;
  }
  
  isLoading(){
    return this.loading;
  }
}