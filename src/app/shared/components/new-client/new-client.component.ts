import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shared-new-client',
  templateUrl: './new-client.component.html',
  styles: [
  ]
})
export class NewClientComponent {

  public currentRoute?: string;

  constructor(private route: ActivatedRoute){
    this.route.url.subscribe(urlSegments => {
      this.currentRoute = urlSegments[0].path; // Obtener el primer segmento de la URL
    });
  }

}
