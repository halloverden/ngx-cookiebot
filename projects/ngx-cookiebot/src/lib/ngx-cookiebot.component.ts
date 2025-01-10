import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-cookiebot-declaration',
  template: '<div #ngxCookiebot></div>',
  styles: [':host { display: block }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCookiebotComponent implements OnInit {
  #ngxCookiebotConfig = inject(NgxCookiebotConfig);

  @ViewChild('ngxCookiebot', { static: true })
  ngxCookiebotElement: ElementRef;

  ngOnInit(): void {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.id = 'CookieDeclaration';
    script.src =
      'https://consent.cookiebot.' +
      this.#ngxCookiebotConfig.cdn +
      '/' +
      this.#ngxCookiebotConfig.cbId +
      '/cd.js';
    script.async = true;
    this.ngxCookiebotElement.nativeElement.append(script);
  }
}
