import {Injectable} from '@angular/core';
// import { ENVIRONMENT } from '../../environments/environment';
import {environment} from '../../../environments/environment';

// import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
// @TODO hacer andar el NotificationsService
export class LoggerService {
  static LEVEL_NONE = 0;
  static LEVEL_CRITICAL = 1;
  static LEVEL_ERROR = 2;
  static LEVEL_WARNING = 3;
  static LEVEL_INFO = 4;
  static LEVEL_DEBUG = 5;
  protected log_level: number;

  // protected notificationsSettings: any = {
  //   timeOut: 3000,
  //   showProgressBar: true,
  //   pauseOnHover: true,
  //   clickToClose: true
  // };

  // constructor(private notificationService: NotificationsService) {
  constructor() {
    if (typeof(environment.log_level) === undefined) {
      this.log_level = LoggerService.LEVEL_DEBUG;
    } else {
      this.log_level = environment.log_level;
    }
  }

  log(...msg: any[]) {
    console.log(...msg);
  }

  info(...msg: any[]) {
    msg.unshift('INFO: ');
    if (this.log_level >= LoggerService.LEVEL_INFO) {
      console.info(...msg);
    }

    return this;
  }

  warn(...msg: any[]) {
    msg.unshift('WARNING: ');
    if (this.log_level >= LoggerService.LEVEL_WARNING) {
      console.warn(...msg);
    }

    return this;
  }

  error(...msg: any[]) {
    msg.unshift('ERROR: ');
    if (this.log_level >= LoggerService.LEVEL_ERROR) {
      console.error(...msg);
    }

    return this;
  }

  debug(...msg: any[]) {
    msg.unshift('DEBUG: ');
    if (this.log_level >= LoggerService.LEVEL_DEBUG) {
      console.debug(...msg);
    }

    return this;
  }

  critical(...msg: any[]) {
    msg.unshift('CRITICAL: ');
    if (this.log_level >= LoggerService.LEVEL_CRITICAL) {
      console.error(...msg);
    }

    return this;
  }

  // notifyInfo(title: any, content?: any, override: any = {}) : any  {
  //   return this.notificationService.info(title, content, Object.assign(this.notificationsSettings, override));
  // }
  //
  // notifyError(title: any, content?: any, override: any = {})  : any {
  //   return this.notificationService.error(title, content, Object.assign(this.notificationsSettings, override));
  // }
  //
  // notifySuccess(title: any, content?: any, override: any = {}) : any  {
  //   return this.notificationService.success(title, content, Object.assign(this.notificationsSettings, override));
  // }
  //
  // notifyWarn(title: any, content?: any, override: any = {}) : any  {
  //   return this.notificationService.warn(title, content, Object.assign(this.notificationsSettings, override));
  // }
  //
  // notifyRemove(id?: any) {
  //   return this.notificationService.remove(id);
  // }
  //
  // notifySaveError(previousNotification?: any)  : any {
  //   if (previousNotification) this.notificationService.remove(previousNotification.id);
  //
  //   return this.notifyError('Hubo un error al guardar los datos', 'Espere un momento y trate nuevamente.');
  // }
  //
  // notifySaveSuccess(previousNotification?: any) : any {
  //   if (previousNotification) this.notificationService.remove(previousNotification.id);
  //
  //   return this.notifySuccess('Los datos fueron guardados exitosamente');
  // }
  //
  // notifyHold() : any {
  //   return this.notifyWarn('Por favor, espere...');
  // }
}
