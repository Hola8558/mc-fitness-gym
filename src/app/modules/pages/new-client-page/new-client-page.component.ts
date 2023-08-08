import { Component, OnInit } from '@angular/core';
import { Database, set, ref, update } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client-page',
  templateUrl: './new-client-page.component.html',
  styles: [
  ]
})
export class NewClientPageComponent implements OnInit {

  fechaPredeterminada: string;
  public randomAccountNumber?: string;
  campoTexto: string = '';

  constructor(
    public database: Database,
    private router: Router,
    ){
      const fechaActual = new Date();
      const dia = fechaActual.getDate();
      const mes = fechaActual.getMonth() + 1;
      const año = fechaActual.getFullYear();

      this.fechaPredeterminada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    }

  ngOnInit(): void {
    this.randomAccountNumber = this.generateRandomAccountNumber();
  }

  registerNewClient( value: any ){

    set(ref(this.database, 'clients/' + value.readOnlyField), {
      Ncuenta: value.readOnlyField ,
      name: value.name.toLowerCase(),
      mensualType: value.mensualType ,
      datePay : value.datePay
    });

    this.router.navigate(['/ruta-destino']);
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Genera un número de cuenta de 5 dígitos al azar
  generateRandomAccountNumber(): string {
    const min = 10000; // El número mínimo de 5 dígitos
    const max = 100000; // El número máximo de 5 dígitos (excluido)
    const randomNumber = this.getRandomNumber(min, max);
    return randomNumber.toString();
  }

}
