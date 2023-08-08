import { EventEmitter, Injectable, Output } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';

@Injectable({providedIn: 'root'})

export class ModulesService {

  @Output() disparadorDataClient : EventEmitter<Client> = new EventEmitter();
  public estatus: number = 1;
  constructor(private db: Database){}



  initializeDates(date: number) : number {

    const startDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      this.estatus = 0;
      if (daysDifference >= 0 && daysDifference <= 21) {
        this.estatus = 1;
      } else if (daysDifference > 21 && daysDifference <= 28) {
        this.estatus = 2;
      }};

      return this.estatus
  };

  infoCLient( client : Client[], cuenta: number ) {

    const db = getDatabase();
    const dbRef = ref(db, 'clients/')
    client = []
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        if (data.Ncuenta.startsWith(cuenta)) {

          client.push(
            {
              nomComplete: data.name[0].toUpperCase() + data.name.substr(1).toLowerCase(),
              NCuenta: data.Ncuenta,
              estatus: data.datePay,
              mensType: data.mensualType,
            })
        };

        console.log(client)

      });
    }, { onlyOnce: true } );

    return client
  }

}
