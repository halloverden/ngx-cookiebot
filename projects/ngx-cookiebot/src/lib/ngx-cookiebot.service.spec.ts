import { TestBed } from '@angular/core/testing';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';

import { NgxCookiebotService } from './ngx-cookiebot.service';

describe('NgxCookiebotService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [
        {
          provide: NgxCookiebotConfig,
          useValue: {
            loadScript: false
          }
        }
      ]
  }));

  it('should be created', () => {
    const service: NgxCookiebotService = TestBed.get(NgxCookiebotService);
    expect(service).toBeTruthy();
  });
});
