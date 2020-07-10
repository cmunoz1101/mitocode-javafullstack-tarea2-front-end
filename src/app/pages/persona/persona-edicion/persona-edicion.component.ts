import { Persona } from './../../../_model/persona';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../_service/persona.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  id: number;
  persona: Persona;
  form: FormGroup;
  edicion = false;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.persona = new Persona();

    this.form = new FormGroup({
      idPersona: new FormControl(0),
      nombres: new FormControl(''),
      apellidos: new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });

  }

  initForm(): void {

    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        const idPersona = data.idPersona;
        const nombres = data.nombres;
        const apellidos = data.apellidos;
        this.form = new FormGroup({
          idPersona: new FormControl(idPersona),
          nombres: new FormControl(nombres),
          apellidos: new FormControl(apellidos)
        });
      });
    }

  }

  operar(): void {

    this.persona.idPersona = this.form.value.idPersona;
    this.persona.nombres = this.form.value.nombres;
    this.persona.apellidos = this.form.value.apellidos;

    if (this.persona != null && this.persona.idPersona > 0) {

      this.personaService.modificar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('Se modificó');
      });

    } else {

      this.personaService.registrar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('Se registró');
      });

    }

    this.router.navigate(['persona']);

  }

}
