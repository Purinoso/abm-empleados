import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpleadoComponent } from './form-empleado.component';

describe('FormEmpleadoComponent', () => {
  let component: FormEmpleadoComponent;
  let fixture: ComponentFixture<FormEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
