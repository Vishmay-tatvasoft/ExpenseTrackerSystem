import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivateInterface } from '../models/can-component-deactivate.interface';
import { inject } from '@angular/core';
import { CanDeactivateService } from '../../shared/services/can-deactivate-service';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivateInterface> = (component, currentRoute, currentState, nextState) => {
  const service = inject(CanDeactivateService);
  // return component.canDeactivate ? component.canDeactivate() : true;
  return service.execute();
};
