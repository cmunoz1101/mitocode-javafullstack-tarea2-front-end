import { Producto } from './../../../_model/producto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from '../../../_service/producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id: number;
  producto: Producto;
  form: FormGroup;
  edicion = false;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {

    this.producto = new Producto();

    this.form = new FormGroup({
      idProducto: new FormControl(0),
      nombre: new FormControl(''),
      marca: new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });

  }

  initForm(): void {

    if (this.edicion) {
      this.productoService.listarPorId(this.id).subscribe(data => {
        const idProducto = data.idProducto;
        const nombre = data.nombre;
        const marca = data.marca;
        this.form = new FormGroup({
          idProducto: new FormControl(idProducto),
          nombre: new FormControl(nombre),
          marca: new FormControl(marca)
        });
      });
    }

  }

  operar(): void {

    this.producto.idProducto = this.form.value.idProducto;
    this.producto.nombre = this.form.value.nombre;
    this.producto.marca = this.form.value.marca;

    if (this.producto != null && this.producto.idProducto > 0) {

      this.productoService.modificar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('Se modificó');
      });

    } else {

      this.productoService.registrar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('Se registró');
      });

    }

    this.router.navigate(['producto']);

  }

}
