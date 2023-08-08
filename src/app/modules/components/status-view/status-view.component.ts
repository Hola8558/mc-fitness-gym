import { ModulesService } from './../../Services/modules.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modules-status-view',
  templateUrl: './status-view.component.html',
  styles: [
  ]
})
export class StatusViewComponent {

  @Input() estatus: number = 0;
  constructor( public modulesService: ModulesService ){}

}
