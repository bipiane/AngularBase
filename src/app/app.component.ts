import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Pais} from './models';
import {PaisService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Base';

  @Input() public paises: Array<Pais> = [];

  constructor(
    private _paisService: PaisService,
  ) {
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
