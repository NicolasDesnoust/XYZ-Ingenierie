import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ButtonDescription<T> {
  type: T;
  text: string;
  icon: string;
  style: ButtonStyle;
  status?: ButtonStatus;
  callback: () => void;
}

export enum ButtonStyle {
  BASIC,
  FLAT,
  RAISED,
  STROKED,
  ICON,
}

export enum ButtonStatus {
  ENABLED,
  LOADING,
  DISABLED,
}

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['button-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonListComponent {
  @Input() buttons: ButtonDescription<unknown>[] = [];
  @Input() title = '';

  ButtonStyle = ButtonStyle;
  ButtonStatus = ButtonStatus;

  execute(button: ButtonDescription<unknown>): void {
    button.callback();
  }

  isButtonDisabled(button: ButtonDescription<unknown>): boolean {
    return button.status === ButtonStatus.DISABLED;
  }

  isButtonLoading(button: ButtonDescription<unknown>): boolean {
    return button.status === ButtonStatus.LOADING;
  }
}
