import { NgxCookiebotService } from './ngx-cookiebot.service';

export function ngxCookiebotFactory(cookiebotService: NgxCookiebotService): () => Promise<void> {
  return (): Promise<void> => {
    return cookiebotService.init();
  };
}
