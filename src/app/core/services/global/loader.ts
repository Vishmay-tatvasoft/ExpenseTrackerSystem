import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  private loader = signal(false);

  showLoader(){
    this.loader.set(true);
  }

  hideLoader(){
    this.loader.set(false);
  }

  get isLoadingSignal(){
    return this.loader.asReadonly();
  }
}
