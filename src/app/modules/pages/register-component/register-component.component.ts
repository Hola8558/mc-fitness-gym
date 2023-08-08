import { Component, OnInit} from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { Database, ref, onValue, remove } from '@angular/fire/database';
import { get, getDatabase, set } from "firebase/database";
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ModulesService } from '../../Services/modules.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
})
export class RegisterComponentComponent implements OnInit  {

  public clients : Client[] = [];
  selectedItems: { [NCuenta: string]: boolean } = {};
  btnDeleteView = false;
  estatusMensualidad: number = 1;
  checkboxes: boolean[] = []


  constructor(
    public database: Database,
    private router: Router,
    private modulesService: ModulesService,
     ){}



  ngOnInit(): void {
    const db = getDatabase();
    const dbRef = ref(db, 'clients/')
    this.clients.forEach(client => {
      this.selectedItems[client.NCuenta] = false;
    });


    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          this.clients.push(
            {
              nomComplete: data.name[0].toUpperCase() + data.name.substr(1).toLowerCase(),
              NCuenta: data.Ncuenta,
              estatus: this.modulesService.initializeDates(data.datePay),
              mensType: data.mensualType,
            })
          });
      }, {
        onlyOnce: true
      });
  }


  estatusMens( number: number ){
    this.estatusMensualidad = number
    console.log('estatusMens' + number)
    console.log('variable' + this.estatusMensualidad)
  }


  updateSelection($event: any) {
    if ($event.target.checked) { this.checkboxes.push(true) } else { this.checkboxes.splice(0,1) }
    if (this.checkboxes.length > 0) {this.btnDeleteView = true} else{ this.btnDeleteView = false }
  }

  stopP(event: MouseEvent){ event.stopPropagation(); }


  changeToRenovacion(client : Client, event: MouseEvent): void{
    this.modulesService.disparadorDataClient.emit(client);
    localStorage.setItem('clienToRenov', JSON.stringify(client))
    this.router.navigate(['/renovacion']);
    event.stopPropagation();
  }


  performAction() {
    const selectedAccounts  = Object.keys(this.selectedItems)
    .filter(NCuenta => this.selectedItems[NCuenta]);
    // Realizar la acción deseada aquí
    selectedAccounts.forEach(NCuenta => {
      remove(ref(this.database, 'clients/' + NCuenta));
      alert(' User ' + NCuenta + ' removed')
    })
    this.funcionJAJA()
    this.btnDeleteView = false;
    this.checkboxes = []
    // Reiniciar la selección
    Object.keys(this.selectedItems).forEach(NCuenta => {
      this.selectedItems[NCuenta] = false;
    });
  }

  funcionJAJA (){
    const db = getDatabase();
    const dbRef = ref(db, 'clients/')
    this.clients = []
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        this.clients.push(
          {
            nomComplete: data.name[0].toUpperCase() + data.name.substr(1).toLowerCase(),
            NCuenta: data.Ncuenta,
            estatus: this.modulesService.initializeDates(data.datePay),
            mensType: data.mensualType,
          })
        });
    }, {
      onlyOnce: true
    });
  }

  udateElements( value: string ):void {

    if (value.length === 0 || value === '') { this.funcionJAJA()  } else {

      const db = getDatabase();
      const dbRef = ref(db, 'clients/')
      this.clients = []
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (
            data.name.toLowerCase().includes(value.toLowerCase()) ||
            data.Ncuenta.startsWith(value)) {

            this.clients.push(
              {
                nomComplete: data.name[0].toUpperCase() + data.name.substr(1).toLowerCase(),
                NCuenta: data.Ncuenta,
                estatus: this.modulesService.initializeDates(data.datePay),
                mensType: data.mensualType,
              })
          };

        });
      }, { onlyOnce: true } );
    }};


    public fecha : number[] = [];



    updateEntrada(client : Client, event: MouseEvent){
      event.stopPropagation();
      const formattedDate = this.getFormattedDate();
      console.log(formattedDate);

      const db = getDatabase();

      const path = `clients/${client.NCuenta}/asistencia/${formattedDate[0]}/${formattedDate[1]}`;
      const dbRef = ref(db, path);

      get(dbRef)
        .then((snapshot) => {

          if (snapshot.exists()) {

            // Actualiza la estructura de datos para agregar el nuevo valor
          const data = snapshot.val();
          if (!data.days) {
            data.days = []; // Crea un array si no existe
          }

          if (!data.days.includes(formattedDate[2])) {
            data.days.push(formattedDate[2]);
          }

          // Actualiza la base de datos con la nueva estructura de datos
          set(dbRef, data);
          } else {
          // Si el nodo no existe, crea la estructura de datos desde cero
          const newData = {
            days: [formattedDate[2]]
          };

          set(dbRef, newData);
        }

      });   alert('updateado');
    }


    getFormattedDate() {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Los meses en JavaScript son base 0
      const day = currentDate.getDate();

      this.fecha = [year,month,day]

      return this.fecha;
    }

    onRowClick(event: MouseEvent, client : Client){
      this.router.navigate(['client/', client.NCuenta]);
    }

}
