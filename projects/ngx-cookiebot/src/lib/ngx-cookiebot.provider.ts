import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders, PLATFORM_ID, Type } from '@angular/core';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';
import { NgxCookiebotService } from './ngx-cookiebot.service';
import { ngxCookiebotFactory } from './ngx-cookiebot.factory';

export function ngxCookiebotProvider(
  cookiebotConfig: Type<NgxCookiebotConfig>,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NgxCookiebotConfig, useClass: cookiebotConfig },
    { provide: NgxCookiebotService, useClass: NgxCookiebotService, deps: [NgxCookiebotConfig, PLATFORM_ID] },
    { provide: APP_INITIALIZER, useFactory: ngxCookiebotFactory, deps: [NgxCookiebotService, PLATFORM_ID], multi: true },
  ]);
}
