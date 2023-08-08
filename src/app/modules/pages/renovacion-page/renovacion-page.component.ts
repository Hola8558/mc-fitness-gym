import { Component } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { Database, getDatabase, ref } from '@angular/fire/database';
import { update } from '@firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'modules-renovacion-page',
  templateUrl: './renovacion-page.component.html',
  styles: [
  ]
})
export class RenovacionPageComponent {
  public client: Client = JSON.parse(  localStorage.getItem('clienToRenov')!)

  fechaPredeterminada: string; // Declarar la propiedad
  campoTexto: string = '';

  constructor(
    public database: Database,
    private router: Router,
    ) {
    // Obtener la fecha actual y formatearla en el formato 'yyyy-MM-dd'
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();

    this.fechaPredeterminada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  }

  updateData(value:any){

    const db = getDatabase();
    const dbRef = ref(db, 'clients/'+ this.client.NCuenta)

    update(dbRef, {
      mensualType: value.mensualType,
      datePay: value.datePay
    });

    alert('updateado');

    this.router.navigate(['/ss']);

  }
}
