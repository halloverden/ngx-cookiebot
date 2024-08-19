import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';
import { isPlatformBrowser } from '@angular/common';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})

/**
 * Exposes the 'Cookiebot' object provided by the Cookiebot SDK
 * https://www.cookiebot.com/en/developer/
 */
export class NgxCookiebotService {
  #cookiebotConfig = inject(NgxCookiebotConfig);
  #platformId = inject(PLATFORM_ID);
  #onAcceptCallback$: Subject<void> = new Subject<void>();
  #onDeclineCallback$: Subject<void> = new Subject<void>();
  #onDialogDisplayCallback$: Subject<void> =
    new Subject<void>();
  #onDialogInitCallback$: Subject<void> = new Subject<void>();
  #onLoadCallback$: Subject<void> = new Subject<void>();
  #onServiceReady$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  #onTagsExecutedCallback$: Subject<void> =
    new Subject<void>();
  #window: any = new Subject<void>();

  cookiebot: any;
  onAccept$: Observable<any>;
  onLoad$: Observable<any>;
  onConsentReady$: Observable<any>;
  onDecline$: Observable<any>;
  onDialogInit$: Observable<any>;
  onDialogDisplay$: Observable<any>;
  onTagsExecuted$: Observable<any>;
  onAcceptCallback$ = this.#onAcceptCallback$.asObservable();
  onDeclineCallback$ = this.#onDeclineCallback$.asObservable();
  onDialogDisplayCallback$ = this.#onDialogDisplayCallback$.asObservable();
  onDialogInitCallback$ = this.#onDialogInitCallback$.asObservable();
  onLoadCallback$ = this.#onLoadCallback$.asObservable();
  onServiceReady$ = this.#onServiceReady$.asObservable();
  onTagsExecutedCallback$ = this.#onTagsExecutedCallback$.asObservable();

  constructor() {
    if (isPlatformBrowser(this.#platformId)) {
      this.#verifyConfig();
      this.#window = getWindow();
    }
  }

  init(): Promise<void> {
    if (!isPlatformBrowser(this.#platformId)) {
      return new Promise<void>((resolve) => {
        resolve();
      });
    }

    return new Promise<void>((resolve) => {
      try {
        if (this.#cookiebotConfig.loadScript !== false) {
          this.#window.document.head.append(this.#buildScriptTag());
        }
      } catch (e) {
        this.#onServiceReady$.error(e);
        return resolve();
      }

      const scriptInjectionTimeout = setTimeout(() => {
        this.#onServiceReady$.error('Timed out');
        clearInterval(scriptInjectionCheckInterval);
      }, 30000); // 30 seconds

      const scriptInjectionCheckInterval = setInterval(() => {
        // The Cookiebot people added and ID to the script tag
        // with the same name as the object it exposes
        // https://twitter.com/jacksdrobinson/status/1188152645032255491
        if (!(this.#window.Cookiebot instanceof HTMLElement)) {
          this.cookiebot = this.#window.Cookiebot;
          this.#setUpCallbacks();
          this.#setUpEventHandlers();
          clearInterval(scriptInjectionCheckInterval);
          clearTimeout(scriptInjectionTimeout);
          this.#onServiceReady$.next(true);
        }
      }, 10);

      return resolve();
    });
  }

  #buildScriptTag(): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.' + this.#cookiebotConfig.cdn + '/uc.js';
    script.setAttribute('data-cbid', this.#cookiebotConfig.cbId);

    if ('auto' === this.#cookiebotConfig.blockingMode) {
      script.setAttribute('data-blockingmode', 'auto');
    } else {
      script.async = true;
    }

    if ('disabled' === this.#cookiebotConfig.consentMode) {
      script.setAttribute('data-consentmode', this.#cookiebotConfig.consentMode);
    }

    if (this.#cookiebotConfig.culture) {
      script.setAttribute('data-culture', this.#cookiebotConfig.culture);
    }

    if (this.#cookiebotConfig.framework) {
      script.setAttribute('data-framework', this.#cookiebotConfig.framework);
    }

    if (this.#cookiebotConfig.level) {
      script.setAttribute('data-level', this.#cookiebotConfig.level);
    }

    if (this.#cookiebotConfig.type) {
      script.setAttribute('data-type', this.#cookiebotConfig.type);
    }

    if (this.#cookiebotConfig.widgetEnabled) {
      script.setAttribute('data-widget-enabled', this.#cookiebotConfig.widgetEnabled ? 'true' : 'false');
    }

    if (this.#cookiebotConfig.widgetPosition) {
      script.setAttribute('data-widget-position', this.#cookiebotConfig.widgetPosition);
    }

    if (this.#cookiebotConfig.widgetDistanceVertical) {
      script.setAttribute('data-widget-distance-vertical', this.#cookiebotConfig.widgetDistanceVertical.toString());
    }

    if (this.#cookiebotConfig.widgetDistanceHorizontal) {
      script.setAttribute('data-widget-distance-horizontal', this.#cookiebotConfig.widgetDistanceHorizontal.toString());
    }

    return script;
  }

  #setUpCallbacks(): void {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    window.CookiebotCallback_OnAccept = () => {
      this.#onAcceptCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDecline = () => {
      this.#onDeclineCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDialogDisplay = () => {
      this.#onDialogDisplayCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDialogInit = () => {
      this.#onDialogInitCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnLoad = () => {
      this.#onLoadCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnTagsExecuted = () => {
      this.#onTagsExecutedCallback$.next();
    };
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  }

  #setUpEventHandlers(): void {
    this.onAccept$ = fromEvent(this.#window, 'CookiebotOnAccept');
    this.onConsentReady$ = fromEvent(this.#window, 'CookiebotOnConsentReady');
    this.onDecline$ = fromEvent(this.#window, 'CookiebotOnDecline');
    this.onDialogInit$ = fromEvent(this.#window, 'CookiebotOnDialogInit');
    this.onDialogDisplay$ = fromEvent(this.#window, 'CookiebotOnDialogDisplay');
    this.onLoad$ = fromEvent(this.#window, 'CookiebotOnLoad');
    this.onTagsExecuted$ = fromEvent(this.#window, 'CookiebotOnTagsExecuted');
  }

  #verifyConfig(): void {
    if (typeof this.#cookiebotConfig.loadScript !== 'boolean') {
      throw new Error(
        'Wrong loadScript config value. Please provide a correct value in the Cookiebot config',
      );
    }

    // Nothing to validate if script is manually set
    if (this.#cookiebotConfig.loadScript === false) {
      return;
    }

    if (!this.#cookiebotConfig.cdn || !['com', 'eu'].includes(this.#cookiebotConfig.cdn)) {
      throw new Error(
        'Wrong cdn config value. Please provide a correct value in the Cookiebot config',
      );
    }

    if (!this.#cookiebotConfig.cbId) {
      throw new Error(
        'Wrong cbId config value. Please provide a correct value in the Cookiebot config',
      );
    }

    if (!this.#cookiebotConfig.blockingMode || !['auto', 'manual'].includes(this.#cookiebotConfig.blockingMode)) {
      throw new Error(
        'Wrong blockingMode config value. Please provide a correct value in the Cookiebot config',
      );
    }
  }
}
