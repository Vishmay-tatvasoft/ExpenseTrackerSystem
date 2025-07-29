import { Observable } from "rxjs";

export interface CanComponentDeactivateInterface {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
