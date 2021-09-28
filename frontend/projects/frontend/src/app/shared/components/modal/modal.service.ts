import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ModalComponent } from './modal.component';

export interface ModalOptions {
  title: string;
  message: string;
  cancelText?: string;
  confirmText: string;
  confirmColor: 'primary' | 'accent' | 'warn';
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialogRef: MatDialogRef<ModalComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  public open(options: ModalOptions): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        confirmColor: options.confirmColor,
      },
    });
  }

  public confirmed(): Observable<any> {
    if (this.dialogRef) {
      return this.dialogRef.afterClosed().pipe(
        take(1),
        map((res) => {
          return res;
        })
      );
    } else {
      throw new Error(
        'ModalComponent is null. Make sure a modal has been opened ' +
          'before calling confirmed() method.'
      );
    }
  }
}
