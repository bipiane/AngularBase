import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators/catchError';
import {AppAlertService} from './app-alert.service';
import {map} from 'rxjs/operators/map';
import {Router} from '@angular/router';
import {ErrorValidacion} from '../models';

@Injectable()
export class ApiService {
  constructor(
    private _router: Router,
    private http: HttpClient,
    private _appAlertService: AppAlertService
  ) {
  }

  private handleResponse(response, showErrorMessages = true) {
    console.log('API Response:', response);
    if (!showErrorMessages) {
      return response;
    }

    switch (response['result']) {
      case 'error':
        console.error(`ERROR API con status ${response.status}:`, response);
        return this.cargarErrores(response);
      case 'info':
        this._appAlertService.info(response['userMessage']);
        return response;
      case 'ok':
        return response;
    }
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ha ocurrido un error:', error.error.message);
    } else {
      console.error(`API retornó error ${error.status}:`, error.error);
    }
    if (error.status === 401) {
      switch (error.error.error) {
        case 'invalid_grant':
          this._appAlertService.reset();
          this._appAlertService.warning('Debe iniciar Sesión');
          this.routeToLogin();
          break;
        case 'access_denied':
          this._appAlertService.reset();
          this._appAlertService.warning('Acceso denegado');
          this.routeToLogin();
          break;
        default:
          this._appAlertService.warning('No esta autorizado');
          break;
      }
    } else if (error.status === 403) {
      this._appAlertService.reset();
      this._appAlertService.error('Acceso denegado');
      // this.routeToLogin(); // @TODO Determinar si es mejor desloguar o enviar a home en caso de 'Acceso denegado'
      this._router.navigate(['/login']);
    } else if (error.status === 409) {
      // Errores de validación
      // Retornamos los datos del error para que sea tratado por handleResponse
      return of(error.error);
    } else {
      this._appAlertService.error('Algo salio mal; Por favor vuelva a intentar mas tarde.');
    }
    // return new ErrorObservable('Algo salio mal; Por favor vuelva a intentar mas tarde.');
    return new ErrorObservable();
  }

  private routeToLogin() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  /**
   * Modifica la lista de errores de validación de la response
   * a una lista de strings con los mensajes de cada atributo
   */
  private cargarErrores(responseError) {
    const validationErrors = [];
    if (responseError.validationErrors) {
      this._appAlertService.warning(responseError['userMessage']);

      responseError.validationErrors.forEach(dataError => {
        const errorValidator = new ErrorValidacion(dataError);
        if (validationErrors[errorValidator.propertyPath]) {
          validationErrors[errorValidator.propertyPath] = `${validationErrors[errorValidator.propertyPath]} ${errorValidator.message}`;
        } else {
          validationErrors[errorValidator.propertyPath] = errorValidator.message;
        }
      });
      responseError.validationErrors = validationErrors;
    } else {
      this._appAlertService.error(responseError['userMessage']);
    }
    return responseError;
  }

  get(path: string, params: Object = {}, headers: Object = {}, showErrorMessages = true): Observable<any> {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    let httpHeaders: HttpHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        httpHeaders = httpHeaders.append(key, headers[key]);
      });
    }

    console.log('API.SERVICE.GET:' + `${environment.api_url}${path}`);

    return this.http.get(`${environment.api_url}${path}`, {params: httpParams, headers: httpHeaders})
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        }),
        map(response => this.handleResponse(response, showErrorMessages))
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(
      catchError((err) => {
        return this.handleError(err);
      }),
      map(response => this.handleResponse(response))
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(
      catchError((err) => {
        return this.handleError(err);
      }),
      map(response => this.handleResponse(response))
    );
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(
      catchError((err) => {
        return this.handleError(err);
      }),
      map(response => this.handleResponse(response))
    );
  }

  getBlob(path: string): Observable<any> {
    const url = `${environment.api_url}${path}`;
    return this.http.get(url, {responseType: 'blob', observe: 'response' as 'response'})
      .pipe(
        catchError((err) => {
          console.log('getBlob err: ', err);
          return this.handleError(err);
        }),
        map(response => {
          console.log('getBlob resp: ', response);
          return response;
        })
      );
  }
}
