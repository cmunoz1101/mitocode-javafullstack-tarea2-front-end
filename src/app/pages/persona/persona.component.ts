import { Persona } from './../../_model/persona';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PersonaService } from '../../_service/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.personaService.getPersonaCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string): void {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogoEliminar(persona: Persona): void {

    this.dialog.open(PersonaDialogoComponent, {
      width: '500px',
      data: persona
    });

  }

}
