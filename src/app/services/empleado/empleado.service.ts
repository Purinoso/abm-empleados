import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ErrorObserver } from 'rxjs';

import Empleado from '@/interfaces/empleado.interface';
import SnackBarMessageService from '../snack-bar-message/snack-bar-message.service';

@Injectable({
  providedIn: 'root'
})
export default class EmpleadoService {
  private httpClient: HttpClient = inject(HttpClient);
  private snackBarMessageService: SnackBarMessageService = inject(SnackBarMessageService);

  private serverUrl = 'http://localhost:3000/empleados'
  // Uso 'empleados' para manejar el array de los mismos dentro de la clase.
  private empleados: Empleado[] = [];
  // Uso 'empleadosSubject' para informar de los cambios a todos los observers que se suscriban a él en la aplicación.
  private empleadosSubject: BehaviorSubject<Empleado[]> = new BehaviorSubject<Empleado[]>([]);

  constructor() {
    const empleadosJsonObservable: Observable<Empleado[]> = this.httpClient.get<Empleado[]>(this.serverUrl);
    
    empleadosJsonObservable.subscribe(
      this.getObserver(empleados => {
        this.empleados = empleados;
      })
    );

    this.empleadosSubject.next(this.empleados);
  }

  private getObserver<T>(next?: (value: T) => any) {
    const observer: ErrorObserver<T> = {
      next: next,
      error: () => this.snackBarMessageService.showMessage('Ha ocurrido un error al conectarse a la base de datos')
    };

    return observer;
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

    this.httpClient.post<Empleado>(this.serverUrl, empleado).subscribe(this.getObserver());
  }

  udpateEmpleado(empleadoToUpdate: Empleado) {
    const targetEmpleadoIndex = this.empleados.findIndex(empleado => empleado.id === empleadoToUpdate.id);
    if (targetEmpleadoIndex === -1) {
      return;
    }

    this.empleados[targetEmpleadoIndex] = empleadoToUpdate;
    this.empleadosSubject.next(this.empleados);

    this.httpClient.put<Empleado>(`${this.serverUrl}/${empleadoToUpdate.id}`, empleadoToUpdate).subscribe(this.getObserver());
  }

  deleteEmpleado(id: number) {
    // Se usa el index del empleado porque su ID podría no coincidir con su index en el array.
    const targetEmpleadoIndex = this.empleados.findIndex(empleado => empleado.id === id);
    if (targetEmpleadoIndex === -1) {
      return;
    }

    this.empleados.splice(targetEmpleadoIndex, 1);
    this.empleadosSubject.next(this.empleados);

    this.httpClient.delete(`${this.serverUrl}/${id}`).subscribe(this.getObserver());
  }
}