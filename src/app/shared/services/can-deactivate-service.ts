import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService {
  private canDeactivateFn: (() => boolean | Promise<boolean>) | null = null;

  register(fn: () => boolean | Promise<boolean>){
    this.canDeactivateFn = fn;
  }

  execute(): boolean | Promise<boolean> {
    return this.canDeactivateFn?.() ?? true;
  }

  clear() {
    this.canDeactivateFn = null;
  }
}
