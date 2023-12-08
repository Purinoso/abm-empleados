import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Empleado from '@/interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export default class EmpleadoService {
  private serverUrl = 'assets/data/empleados.json'
  private httpClient: HttpClient = inject(HttpClient);

  // Uso 'empleados' para manejar el array de los mismos dentro de la clase.
  private empleados: Empleado[] = [];
  // Uso 'empleadosSubject' para informar de los cambios a todos los observers que se suscriban a él en la aplicación.
  private empleadosSubject: BehaviorSubject<Empleado[]> = new BehaviorSubject<Empleado[]>([]);

  constructor() {
    const empleadosJsonObservable: Observable<Empleado[]> = this.httpClient.get<Empleado[]>(this.serverUrl);

    empleadosJsonObservable.subscribe(empleados => {
      this.empleados = empleados;
      this.empleadosSubject.next(empleados);
    });
  }

  getEmpleadosSubject(): BehaviorSubject<Empleado[]> {
    return this.empleadosSubject;
  }

  getEmpleado(id: number): Empleado | null {
    return this.empleados[id - 1] ?? null;
  }

  addEmpleado(empleado: Empleado) {
    this.empleados.push(empleado);
    
    this.empleadosSubject.next(this.empleados);
  }

  udpateEmpleado(empleadoToUpdate: Empleado) {
    const targetEmpleadoIndex = this.empleados.findIndex(empleado => empleado.id === empleadoToUpdate.id);
    targetEmpleadoIndex !== -1 && (this.empleados[targetEmpleadoIndex] = empleadoToUpdate);

    this.empleadosSubject.next(this.empleados);
  }

  deleteEmpleado(id: number) {
    // Se usa el index del empleado porque su ID podría no coincidir con su index en el array.
    const targetEmpleadoIndex = this.empleados.findIndex(empleado => empleado.id === id);
    targetEmpleadoIndex !== -1 && this.empleados.splice(targetEmpleadoIndex, 1);

    this.empleadosSubject.next(this.empleados);
  }
}