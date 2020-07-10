import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';
import { ProductoDialogoComponent } from './pages/producto/producto-dialogo/producto-dialogo.component';
import { VentaComponent } from './pages/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaEdicionComponent,
    ProductoComponent,
    ProductoEdicionComponent,
    PersonaDialogoComponent,
    ProductoDialogoComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Material Module:
    MaterialModule,
    // HttpClient:
    HttpClientModule,
    BrowserAnimationsModule,
    // Para formularios ngForm (Two way binding):
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
