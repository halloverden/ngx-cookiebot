import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideAppInitializer,
  Type,
} from '@angular/core';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';
import { NgxCookiebotService } from './ngx-cookiebot.service';
import { ngxCookiebotFactory } from './ngx-cookiebot.factory';

export function ngxCookiebotProvider(
  cookiebotConfig: Type<NgxCookiebotConfig>
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NgxCookiebotConfig, useClass: cookiebotConfig },
    {
      provide: NgxCookiebotService,
      useClass: NgxCookiebotService,
      deps: [NgxCookiebotConfig, PLATFORM_ID],
    },
    provideAppInitializer(() => {
      const initializerFn = ngxCookiebotFactory(inject(NgxCookiebotService));
      return initializerFn();
    }),
  ]);
}
