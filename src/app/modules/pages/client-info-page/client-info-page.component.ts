import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Database, getDatabase, onValue, ref } from 'firebase/database';
import { Client } from '../../interfaces/client.interface';
import { ModulesService } from '../../Services/modules.service';

@Component({
  selector: 'app-client-info-page',
  templateUrl: './client-info-page.component.html',
  styles: [
  ]
})
export class ClientInfoPageComponent implements OnInit {

  public clients : Client[] = [];
  public selectedItems: { [NCuenta: string]: boolean } = {};

  constructor( private activatedRoute: ActivatedRoute, private modulesService: ModulesService){}



  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({cuenta  }) => {
      console.log({params: cuenta})

      this.clients = this.modulesService.infoCLient(this.clients, cuenta)






    })
  }

}
