/**
 *
 */
export abstract class NgxCookiebotConfig {
  blockingMode: 'auto' | 'manual' | string;
  cbId: string;
  cdn: 'com' | 'eu' | string;
  culture?: string;
  framework?: string;
  level?: string;
  loadScript: boolean;
  type?: string;
}
