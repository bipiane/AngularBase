import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AppAlertService {

  public alerts: any[] = [];
  private defaultAlerts: any[] = [];

  constructor() {
  }

  reset(): void {
    this.alerts = this.defaultAlerts;
  }

  error(message, timeout = 10000): void {
    this.alerts.push({
      type: 'danger',
      msg: message,
      timeout: timeout
    });
  }

  info(message, timeout = 30000): void {
    this.alerts.push({
      type: 'info',
      msg: message,
      timeout: timeout
    });
  }

  success(message, timeout = 30000): void {
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: timeout
    });
  }

  warning(message, timeout = 5000): void {
    this.alerts.push({
      type: 'warning',
      msg: message,
      timeout: timeout
    });
  }
}
