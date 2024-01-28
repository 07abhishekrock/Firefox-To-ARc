import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { MessageController } from './MessageController';
import { ProfileItem } from 'helpers/profile/ProfileController';

class FirefoxMessageController implements MessageController {

  subscribeToMessage(callback: (msgType: string, msgData?: ProfileItem)=>void) {
    const mCallback = (msgPayload: any) => {
      callback(msgPayload.type, msgPayload.data.newProfile);
    };

    return gracefullySuppressErrors<()=>void>(() => {
      browser.runtime.onMessage.addListener(mCallback);
      return () => browser.runtime.onMessage.removeListener(mCallback);
    }, () => {});
  }

}

export const firefoxMessageController = new FirefoxMessageController();
