import {Injectable} from '@angular/core';
import {ApiService} from '../util';
import {Observable} from 'rxjs';
import {Pais} from '../models';
import {map} from 'rxjs/operators/map';

@Injectable()
export class PaisService {
  private _url = '/v1/paises';

  constructor(private _apiService: ApiService) {
  }

  /**
   * Obtiene todos los paises
   */
  getAll(): Observable<{ data: [Pais], result: string, userMessage: string, validationErrors: {} }> {
    return this._apiService.get(this._url)
      .pipe(map(response => {
        const results = [];
        if (response.data) {
          response.data.forEach(element => {
            results.push(new Pais(element));
          });
          response.data = results;
        }
        return response;
      }));
  }
}
