/**
 *
 */
export abstract class NgxCookiebotConfig {
  blockingMode: 'auto' | 'manual' | string;
  cbId: string;
  loadScript?: boolean;
  cdn?: string;
  culture?: string;
  framework?: string;
  level?: string;
  type?: string;
}
