import { Producto } from './../../_model/producto';
import { Persona } from './../../_model/persona';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../_service/persona.service';
import { ProductoService } from '../../_service/producto.service';
import { VentaService } from '../../_service/venta.service';
import { DetalleVenta } from '../../_model/detalleVenta';
import { Venta } from '../../_model/venta';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  personas: Persona[];
  productos: Producto[];

  idPersonaSeleccionada: number;
  productoSeleccionado: Producto;

  cantidad = 0;
  producto: Producto;
  productoTmp: Producto;

  detalleVenta: DetalleVenta[] = [];

  constructor(
    private personaService: PersonaService,
    private productoService: ProductoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarPersonas();
    this.listarProductos();
    this.ventaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });
  }

  listarPersonas(): void {
    this.personaService.listar().subscribe(data => {
      this.personas = data;
    });
  }

  listarProductos(): void {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
    });
  }

  agregarDetalle(): void {

    if (this.cantidad !== 0 && this.idPersonaSeleccionada !== 0 && this.productoSeleccionado.idProducto !== 0) {

      const detalleVenta = new DetalleVenta();
      detalleVenta.producto = this.productoSeleccionado;
      detalleVenta.cantidad = this.cantidad;
      this.detalleVenta.push(detalleVenta);
      this.productoTmp = this.productoSeleccionado;

      this.cantidad = 0;
      this.productoSeleccionado = new Producto();

    }
  }

  estadoBotonRegistrar(): boolean {
    return (this.detalleVenta.length === 0 || this.productoTmp.idProducto === 0 || this.idPersonaSeleccionada === 0);
  }

  aceptar(): void {

    const persona = new Persona();
    persona.idPersona = this.idPersonaSeleccionada;

    let producto = new Producto();
    producto = this.productoSeleccionado;

    const venta = new Venta();
    venta.detalleVenta = this.detalleVenta;
    venta.fecha = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
    venta.importe = 55.5;
    venta.persona = persona;

    this.ventaService.registrar(venta).subscribe(() => {
      this.ventaService.setMensajeCambio('Se registró');
      this.limpiarControles();
    });

  }

  limpiarControles(): void {
    this.detalleVenta = [];
    this.idPersonaSeleccionada = 0;
    this.productoSeleccionado = new Producto();
    this.cantidad = 0;
    this.productoTmp = new Producto();
  }

  cancelar(): void {
    this.limpiarControles();
  }

}
