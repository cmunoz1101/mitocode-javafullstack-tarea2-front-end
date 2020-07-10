import { Producto } from './../../../_model/producto';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../../_service/producto.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.css']
})
export class ProductoDialogoComponent implements OnInit {

  producto: Producto;

  constructor(
    private dialogRef: MatDialogRef<ProductoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.producto = this.data;
  }

  eliminar(): void {

    this.productoService.eliminar(this.producto.idProducto).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(data => {
      this.productoService.setProductoCambio(data);
      this.productoService.setMensajeCambio('Se eliminó');
    });

    this.cancelar();

  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
