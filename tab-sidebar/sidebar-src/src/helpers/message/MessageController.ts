export interface MessageController {
  subscribeToMessage(callback: (msgType: string, msgData: any)=>void): ()=>void;
}
