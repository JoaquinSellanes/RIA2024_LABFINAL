import { CanActivateFn } from '@angular/router';

export const panaderiaGuard: CanActivateFn = (route, state) => {
  return true;
};
