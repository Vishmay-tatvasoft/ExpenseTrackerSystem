import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snackbar {
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  openSnackBar(message: string, panelClass: string) {
    this._snackBar.open(message, '', {
      panelClass: [panelClass],
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

}
