import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClassValue } from 'src/shared/models/ngClassValue.model';
import { ButtonType } from '../chuck-jokes/models/button-type.enum';

@Component({
  selector: 'app-buttons-type',
  templateUrl: './buttons-type.component.html',
  styleUrls: ['./buttons-type.component.scss'],
})
export class ButtonsTypeComponent {
  public buttonType: typeof ButtonType = ButtonType;
  @Input() selectedButtonType: ButtonType;
  @Output() buttonSelectedEvent = new EventEmitter();

  public onButtonSelected(buttonType: ButtonType): void {
    this.buttonSelectedEvent.emit(buttonType);
  }

  public getButtonCss(buttonType: ButtonType): NgClassValue {
    return {
      'button-selected': buttonType === this.selectedButtonType,
    };
  }
}
