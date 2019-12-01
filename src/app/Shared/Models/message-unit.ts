import { SenderType } from './Enums/sender-type.enum';
import { MessageType } from './Enums/message-type.enum';

export class MessageUnit {
    MessageData: string;
    Sender: SenderType;
    Date: Date;
    Type: MessageType;
}
