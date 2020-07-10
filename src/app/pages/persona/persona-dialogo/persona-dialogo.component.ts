import { Persona } from './../../../_model/persona';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonaService } from '../../../_service/persona.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-dialogo.component.html',
  styleUrls: ['./persona-dialogo.component.css']
})
export class PersonaDialogoComponent implements OnInit {

  persona: Persona;

  constructor(
    private dialogRef: MatDialogRef<PersonaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.persona = this.data;
  }

  eliminar(): void {

    this.personaService.eliminar(this.persona.idPersona).pipe(switchMap(() => {
      return this.personaService.listar();
    })).subscribe(data => {
      this.personaService.setPersonaCambio(data);
      this.personaService.setMensajeCambio('Se eliminó');
    });

    this.cancelar();

  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
