import { User } from "./userModel";

export interface Message {
    sender: User;
    date: Date;
    message: string;
    receiver: User;
}