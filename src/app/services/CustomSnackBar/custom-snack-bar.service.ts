import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class CustomSnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: string, success: boolean) {
    this._snackBar.openFromComponent(CustomSnackBarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: success ? 'snackbar-success' : 'snackbar-unsuccess',
      data: {
        message: message,
        action: action,
        success: success,
        snackBar: this._snackBar,
      },
    });
  }
}
