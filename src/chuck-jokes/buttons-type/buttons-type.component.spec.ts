import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/shared/material.module';
import { ButtonType } from '../chuck-jokes/models/button-type.enum';
import { ButtonsTypeComponent } from './buttons-type.component';

describe('ButtonsTypeComponent', () => {
  let component: ButtonsTypeComponent;
  let fixture: ComponentFixture<ButtonsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsTypeComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on random button, should emit random type value', () => {
    let wasEmitted: boolean;

    component.buttonSelectedEvent.subscribe((buttonType: ButtonType) => {
      wasEmitted = true;
      expect(buttonType).toEqual(ButtonType.random);
    });

    component.onButtonSelected(ButtonType.random);

    expect(wasEmitted).toBeTruthy();
  });
});
