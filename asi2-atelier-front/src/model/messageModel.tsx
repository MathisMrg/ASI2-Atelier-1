import { User } from "./userModel";

export interface Message {
    sender: User;
    date: Date;
    message: string;
    receiver: User | undefined;
}

export interface MessageDTO {
    senderId: String;
    sentAt: Date;
    message: string;
    receiverId: String;
}