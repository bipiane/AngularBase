import {TestBed, inject} from '@angular/core/testing';

import {AppAlertService} from './app-alert.service';

describe('AppAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppAlertService]
    });
  });

  it('should be created', inject([AppAlertService], (service: AppAlertService) => {
    expect(service).toBeTruthy();
  }));
});
