import {NgxCookiebotService} from './ngx-cookiebot.service';

/**
 *
 */
export function ngxCookiebotFactory(cookieBotService: NgxCookiebotService): () => Promise<void> {
  return (): Promise<void> => {
    return cookieBotService.init();
  };
}
