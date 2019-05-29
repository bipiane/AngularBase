import {Component, Input, OnInit} from '@angular/core';
import {Pais} from './models';
import {PaisService} from './services';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Base';
  entorno = environment.entorno;

  @Input() public paises: Array<Pais> = [];

  constructor(private _paisService: PaisService) {
  }

  ngOnInit() {
    this.fetchPaises();
  }

  /**
   * Carga los paises
   */
  fetchPaises() {
    this._paisService.getAll()
      .subscribe(response => {
        if (response.result === 'ok') {
          this.paises = response.data;
        }
      });
  }
}
