import { TestBed } from '@angular/core/testing';

import { NgxCookiebotService } from './ngx-cookiebot.service';

describe('NgxCookiebotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCookiebotService = TestBed.get(NgxCookiebotService);
    expect(service).toBeTruthy();
  });
});
