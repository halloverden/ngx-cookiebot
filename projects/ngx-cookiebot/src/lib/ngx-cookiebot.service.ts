import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';
import { isPlatformBrowser } from '@angular/common';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

/**
 * Exposes the 'Cookiebot' object provided by the Cookiebot SDK
 * https://www.cookiebot.com/en/developer/
 */
export class NgxCookiebotService {
  cookiebot: any;
  onAccept$: Observable<any>;
  onLoad$: Observable<any>;
  onConsentReady$: Observable<any>;
  onDecline$: Observable<any>;
  onDialogInit$: Observable<any>;
  onDialogDisplay$: Observable<any>;
  onTagsExecuted$: Observable<any>;

  private readonly _onAcceptCallback$: Subject<void> = new Subject<void>();
  onAcceptCallback$ = this._onAcceptCallback$.asObservable();

  private readonly _onDeclineCallback$: Subject<void> = new Subject<void>();
  onDeclineCallback$ = this._onDeclineCallback$.asObservable();

  private readonly _onDialogDisplayCallback$: Subject<void> =
    new Subject<void>();
  onDialogDisplayCallback$ = this._onDialogDisplayCallback$.asObservable();

  private readonly _onDialogInitCallback$: Subject<void> = new Subject<void>();
  onDialogInitCallback$ = this._onDialogInitCallback$.asObservable();

  private readonly _onLoadCallback$: Subject<void> = new Subject<void>();
  onLoadCallback$ = this._onLoadCallback$.asObservable();

  private readonly _onServiceReady$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  onServiceReady$ = this._onServiceReady$.asObservable();

  private readonly _onTagsExecutedCallback$: Subject<void> =
    new Subject<void>();
  onTagsExecutedCallback$ = this._onTagsExecutedCallback$.asObservable();

  private readonly _window: any = new Subject<void>();

  /**
   *
   */
  constructor(private cookiebotConfig: NgxCookiebotConfig,
              @Inject(PLATFORM_ID) private _platformId: object) {
    if (isPlatformBrowser(this._platformId)) {
      this._verifyConfig();
      this._window = getWindow();
    }
  }

  /**
   *
   */
  init(): Promise<void> {
    if (isPlatformBrowser(this._platformId)) {
      return new Promise<void>((resolve) => {
        try {
          if (this.cookiebotConfig.loadScript !== false) {
            this._window.document.head.append(this._buildScriptTag());
          }
        } catch (e) {
          this._onServiceReady$.error(e);
          return resolve();
        }

        const scriptInjectionTimeout = setTimeout(() => {
          this._onServiceReady$.error('Timed out');
          clearInterval(scriptInjectionCheckInterval);
        }, 30000); // 30 seconds

        const scriptInjectionCheckInterval = setInterval(() => {
          // The Cookiebot people added and ID to the script tag
          // with the same name as the object it exposes
          // https://twitter.com/jacksdrobinson/status/1188152645032255491
          if (!(this._window.Cookiebot instanceof HTMLElement)) {
            this.cookiebot = this._window.Cookiebot;
            this._setUpCallbacks();
            this._setUpEventHandlers();
            clearInterval(scriptInjectionCheckInterval);
            clearTimeout(scriptInjectionTimeout);
            this._onServiceReady$.next(true);
          }
        }, 10);

        return resolve();
      });
    } else {
      return new Promise<void>((resolve) => {
        resolve();
      });
    }
  }

  /**
   *
   */
  private _buildScriptTag(): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.' + this.cookiebotConfig.cdn + '/uc.js';
    script.setAttribute('data-cbid', this.cookiebotConfig.cbId);

    if ('auto' === this.cookiebotConfig.blockingMode) {
      script.setAttribute('data-blockingmode', 'auto');
    } else {
      script.async = true;
    }

    if (this.cookiebotConfig.culture) {
      script.setAttribute('data-culture', this.cookiebotConfig.culture);
    }

    if (this.cookiebotConfig.framework) {
      script.setAttribute('data-framework', this.cookiebotConfig.framework);
    }

    if (this.cookiebotConfig.level) {
      script.setAttribute('data-level', this.cookiebotConfig.level);
    }

    if (this.cookiebotConfig.type) {
      script.setAttribute('data-type', this.cookiebotConfig.type);
    }

    if (this.cookiebotConfig.widgetEnabled) {
      script.setAttribute('data-widget-enabled', this.cookiebotConfig.widgetEnabled ? 'true' : 'false');
    }

    if (this.cookiebotConfig.widgetPosition) {
      script.setAttribute('data-widget-position', this.cookiebotConfig.widgetPosition);
    }

    if (this.cookiebotConfig.widgetDistanceVertical) {
      script.setAttribute('data-widget-distance-vertical', this.cookiebotConfig.widgetDistanceVertical.toString());
    }

    if (this.cookiebotConfig.widgetDistanceHorizontal) {
      script.setAttribute('data-widget-distance-horizontal', this.cookiebotConfig.widgetDistanceHorizontal.toString());
    }

    return script;
  }

  /**
   *
   */
  private _setUpCallbacks(): void {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    window.CookiebotCallback_OnAccept = () => {
      this._onAcceptCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDecline = () => {
      this._onDeclineCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDialogDisplay = () => {
      this._onDialogDisplayCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnDialogInit = () => {
      this._onDialogInitCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnLoad = () => {
      this._onLoadCallback$.next();
    };

    // @ts-ignore
    window.CookiebotCallback_OnTagsExecuted = () => {
      this._onTagsExecutedCallback$.next();
    };
    /* eslint-enable @typescript-eslint/ban-ts-comment */
  }

  /**
   *
   */
  private _setUpEventHandlers(): void {
    this.onAccept$ = fromEvent(this._window, 'CookiebotOnAccept');
    this.onConsentReady$ = fromEvent(this._window, 'CookiebotOnConsentReady');
    this.onDecline$ = fromEvent(this._window, 'CookiebotOnDecline');
    this.onDialogInit$ = fromEvent(this._window, 'CookiebotOnDialogInit');
    this.onDialogDisplay$ = fromEvent(this._window, 'CookiebotOnDialogDisplay');
    this.onLoad$ = fromEvent(this._window, 'CookiebotOnLoad');
    this.onTagsExecuted$ = fromEvent(this._window, 'CookiebotOnTagsExecuted');
  }

  /**
   *
   */
  private _verifyConfig(): void {
    if (typeof this.cookiebotConfig.loadScript !== 'boolean') {
      throw new Error(
        'Wrong loadScript config value. Please provide a correct value in the Cookiebot config'
      );
    }

    // Nothing to validate if script is manually set
    if (this.cookiebotConfig.loadScript === false) {
      return;
    }

    if (!this.cookiebotConfig.cdn || !['com', 'eu'].includes(this.cookiebotConfig.cdn)) {
      throw new Error(
        'Wrong cdn config value. Please provide a correct value in the Cookiebot config'
      );
    }

    if (!this.cookiebotConfig.cbId) {
      throw new Error(
        'Wrong cbId config value. Please provide a correct value in the Cookiebot config'
      );
    }

    if (!this.cookiebotConfig.blockingMode || !['auto', 'manual'].includes(this.cookiebotConfig.blockingMode)) {
      throw new Error(
        'Wrong blockingMode config value. Please provide a correct value in the Cookiebot config'
      );
    }
  }
}
