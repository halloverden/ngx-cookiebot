import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-cookiebot-declaration',
  template: '<div #ngxCookiebot></div>',
  styles: [':host {display: block}'],
})

/**
 *
 */
export class NgxCookiebotComponent implements OnInit {
  @ViewChild('ngxCookiebot', { static: true })
  ngxCookiebotElement: ElementRef;

  /**
   *
   */
  constructor(private _ngxCookiebotConfig: NgxCookiebotConfig) {}

  /***
   *
   */
  ngOnInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'CookieDeclaration';
    const cdn = this._ngxCookiebotConfig.cdn
      ? this._ngxCookiebotConfig.cdn
      : 'https://consent.cookiebot.com/';
    script.src = cdn + this._ngxCookiebotConfig.cbId + '/cd.js';
    script.async = true;
    script.type = 'module';
    this.ngxCookiebotElement.nativeElement.append(script);
  }
}
