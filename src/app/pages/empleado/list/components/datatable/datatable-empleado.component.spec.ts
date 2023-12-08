import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDatatableComponent } from './datatable-empleado.component';

describe('DatatableComponent', () => {
  let component: EmpleadoDatatableComponent;
  let fixture: ComponentFixture<EmpleadoDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDatatableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
