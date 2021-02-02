/**
 *
 */
export abstract class NgxCookiebotConfig {
  blockingMode: 'auto' | 'manual' | string;
  cbId: string;
  culture?: string;
  framework?: string;
  level?: string;
  type?: string;
}
