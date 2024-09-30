
export interface Sender {
    id: string;
    username: string;
    avatar?: string;
  }
  
export interface Message {
    id: string;
    text: string;
    sender: Sender;
    timestamp: string;
    chatRoomId: string;
    isRead: boolean;
  }

export  interface CombinedItem {
    url: string;
    name: string;
    type: string;
  }