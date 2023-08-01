import { APP_INITIALIZER, ModuleWithProviders, NgModule, PLATFORM_ID, Type } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCookiebotComponent} from './ngx-cookiebot.component';
import {ngxCookiebotFactory} from './ngx-cookiebot.factory';
import {NgxCookiebotConfig} from './ngx-cookiebot.config';
import {NgxCookiebotService} from './ngx-cookiebot.service';

@NgModule({
  declarations: [
    NgxCookiebotComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxCookiebotComponent
  ]
})

/**
 *
 */
export class NgxCookiebotModule {
  static forRoot(cookiebotConfig: Type<NgxCookiebotConfig>): ModuleWithProviders<NgxCookiebotModule> {
    return {
      ngModule: NgxCookiebotModule,
      providers: [
        {provide: NgxCookiebotConfig, useClass: cookiebotConfig},
        {provide: NgxCookiebotService, useClass: NgxCookiebotService, deps: [NgxCookiebotConfig, PLATFORM_ID]},
        {provide: APP_INITIALIZER, useFactory: ngxCookiebotFactory, deps: [NgxCookiebotService, PLATFORM_ID], multi: true}
      ]
    };
  }
}
