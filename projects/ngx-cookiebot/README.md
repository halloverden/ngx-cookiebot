# NgxCookiebot

An Angular wrapper around the [Cookiebot](https://www.cookiebot.com/) SDK.

## Angular support

| Version | Angular support |
|---------|:---------------:|
| ^5.0.0  |     ^18.0.0     |
| ^4.0.0  |     ^17.0.0     |
| ^3.0.0  |     ^16.0.0     |
| 2.3.0   |   8.2.14 - 15   |

## Installation
```
npm i @halloverden/ngx-cookiebot -S
```

## Setup

### Prerequisites
A Cookiebot account.

### 1. Configure service
Configure the service according to the [Cookiebot developer docs](https://www.cookiebot.com/en/developer/). The package also ships with custom config not defined in the Cookiebot developer docs. See below for deets.

```typescript
// cookiebot.config.ts
import { NgxCookiebotConfig } from '@halloverden/ngx-cookiebot';

export class CookiebotConfig extends NgxCookiebotConfig {
  blockingMode: 'auto' | 'manual' | string;
  consentMode?: 'disabled';
  cbId: string;
  cdn: 'com' | 'eu' | string;
  culture?: string;
  framework?: string;
  level?: string;
  loadScript: boolean;
  type?: string;
  widgetEnabled?: boolean;
  widgetPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | string;
  widgetDistanceVertical?: number;
  widgetDistanceHorizontal?: number;
}
```
#### Custom config
In addition to the config defined in the Cookiebot developer docs, the package also supports this custom config:

##### *cdn*
Choose what version of the cookiebot CDN you want to use (https://support.cookiebot.com/hc/en-us/articles/4530208762396-Cookiebot-CMP-European-CDN-solution):

| Config |          CDN          |
|--------|:---------------------:|
| com    | consent.cookiebot.com |
| eu     | consent.cookiebot.eu  |

##### *loadScript*
The package injects the script in the head tag through Angular. This can lead to high script loading time. If your app is time sensitive, you can opt out of the package setting the script tag, and set it yourself. You can use the module for everything else but the script embedding.

NB! If you set this config to false, no other config parameter will have effect, and you need to config them yourself.

### 2. Import package

```typescript
// app.config.ts
import { ngxCookiebotProvider } from '@halloverden/ngx-cookiebot';
import { CookiebotConfig } from '@config/cookiebot.config';

ngxCookiebotProvider(CookiebotConfig)
```

## Usage

### Consent box
The script will now automatically append itself to the `head` tag, which in turn will prompt the cookie consent box.

To interact with the "cookiebot" object, NgxCookiebot comes with a service that exposes it, which is ready for use after the service is ready (the script is injected):

```typescript
// whatever.ts
...
#cookiebotService = inject(NgxCookiebotService);
...
this.#cookiebotService.onServiceReady$.pipe(
  filter((ready: boolean) => {
    return ready;
  })
).subscribe(() => {
  // this.#cookiebotService.cookiebot is available
});
...
```

Reference the [Cookiebot docs](https://www.cookiebot.com/en/developer/) for a list of properties, methods and callbacks available through the cookiebot object. 

If you prefer to use observables, the NgxCookiebotService exposes an observable for every available method and callback on the cookiebot object:

#### Methods

| Method                            | Observable            |
|-----------------------------------|:-------------------------:|
| CookiebotOnConsentReady           | onConsentReady$           |
| CookiebotOnLoad                   | onLoad$                   |
| CookiebotOnAccept                 | onAccept$                 |
| CookiebotOnDecline                | onDecline$                |
| CookiebotOnDialogInit             | onDialogInit$             |
| CookiebotOnDialogDisplay          | onDialogDisplay$          |  
| CookiebotOnTagsExecuted           | onTagsExecuted$           |

#### Callbacks

| Callback                          | Observable                |
|-----------------------------------|:-------------------------:|
| CookiebotCallback_OnLoad          | onLoadCallback$           |
| CookiebotCallback_OnAccept        | onAcceptCallback$         |
| CookiebotCallback_OnDecline       | onDeclineCallback$        |
| CookiebotCallback_OnDialogInit    | onDialogInitCallback$     |
| CookiebotCallback_OnDialogDisplay | onDialogDisplayCallback$  |
| CookiebotCallback_OnTagsExecuted  | onTagsExecutedCallback$   |

Usage example:
```typescript
// whatever.ts
...
this.#cookiebotService.onConsentReady$.subscribe(
  // Consent ready
  console.log(this.#cookiebotService.cookiebot.consent)
);
...
```

### Cookie declaration
The NgxCookiebot package exposes a component to insert the cookie consent declaration. 
Use the component where you want the declaration to appear: 

```
// my.component.html

<ngx-cookiebot-declaration></ngx-cookiebot-declaration>
```

## License
MIT © [Hallo Verden](https://github.com/halloverden)
