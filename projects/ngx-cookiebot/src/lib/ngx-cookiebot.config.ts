export abstract class NgxCookiebotConfig {
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
