import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpleadoComponent } from './list-empleado.component';

describe('ListEmpleadoComponent', () => {
  let component: ListEmpleadoComponent;
  let fixture: ComponentFixture<ListEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
