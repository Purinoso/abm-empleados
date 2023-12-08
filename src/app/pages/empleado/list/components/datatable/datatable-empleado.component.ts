import { AfterViewInit, Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import matColumn from './utils/mat-column.interface';
import Empleado from '@/interfaces/empleado.interface';
import EmpleadoService from '@/services/empleado/empleado.service';

@Component({
  selector: 'empleado-datatable',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './datatable-empleado.component.html',
  styleUrl: './datatable-empleado.component.css'
})
export default class DatatableEmpleadoComponent implements AfterViewInit {
  // Este evento se emitirá con el ID del empleado cuando el usuario clickee en el botón de editar desde la datatable.
  @Output() editClicked = new EventEmitter<number>();
  // Este evento se emitirá con el ID del empleado cuando el usuario clickee en el botón de borrar desde la datatable.
  @Output() deleteClicked = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  private empleadoService: EmpleadoService = inject(EmpleadoService);
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource<Empleado>([]);
  matColumns: matColumn[] = [
    {
      columnDef: 'id',
      headerCell: 'ID',
      cell: 'id',
    },
    {
      columnDef: 'name',
      headerCell: 'Nombre',
      cell: 'name',
    },
    {
      columnDef: 'department',
      headerCell: 'Departamento',
      cell: 'department',
    },
    {
      columnDef: 'jobTitle',
      headerCell: 'Puesto',
      cell: 'jobTitle',
    }
  ]
  displayedColumns: string[] = [
    ...this.matColumns.map(matColumn => matColumn.columnDef),
    'opciones'
  ]

  constructor() {
    this.empleadoService.getEmpleadosSubject().subscribe(empleados => {
      this.dataSource.data = empleados;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}