import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalOptions } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalOptions,
    private mdDialogRef: MatDialogRef<ModalComponent>
  ) {}

  public cancel(): void {
    this.close(false);
  }

  public close(value: any): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
